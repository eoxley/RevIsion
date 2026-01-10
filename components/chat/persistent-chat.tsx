"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Persistent Chat Interface with Voice & Vision Support
 *
 * Features:
 * - Real message persistence to database
 * - Voice input (Speech-to-Text) via microphone button
 * - Audio playback (Text-to-Speech) for AI responses
 * - Image upload (OCR) for extracting text from photos
 * - Learning style aware: Tailored features for different learners
 *
 * Data Flow:
 * 1. Voice Input: Record audio → /api/speech/transcribe → text
 * 2. Image Upload: Photo → /api/vision/ocr → extracted text → chat
 * 3. Chat: Send text → /api/chat → AI response
 * 4. Audio Output: AI response → /api/speech/synthesize → play audio
 */

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
  imagePreview?: string; // For showing uploaded image thumbnail
}

interface Session {
  id: string;
  agent_phase: string;
  session_type: string;
  started_at: string;
}

interface LearningProfile {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
  primaryStyles: string[];
  isMultimodal: boolean;
}

interface SubjectContext {
  subjectCode: string;
  subjectName: string;
  resumeMessage: string;
  nextTopic: string | null;
  hasHistory: boolean;
}

interface PersistentChatProps {
  learningProfile: LearningProfile | null;
  studentName?: string;
  subjects?: string[];
  subjectContext?: SubjectContext | null;
  onClearSubjectContext?: () => void;
}

export function PersistentChat({
  learningProfile,
  studentName,
  subjects = [],
  subjectContext,
  onClearSubjectContext,
}: PersistentChatProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Voice input state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio playback state
  const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Image upload state
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-play preference for auditory learners
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const isAuditoryLearner = learningProfile?.primaryStyles.includes("auditory") ?? false;
  const isVisualLearner = learningProfile?.primaryStyles.includes("visual") ?? false;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize session and load messages
  useEffect(() => {
    async function initializeChat() {
      try {
        // If we have subject context, start a fresh subject-focused session
        if (subjectContext) {
          const newSessionRes = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_type: "subject_focused",
              subject_code: subjectContext.subjectCode,
            }),
          });
          const newSessionData = await newSessionRes.json();

          if (newSessionData.session) {
            setSession(newSessionData.session);
            addSubjectGreeting(newSessionData.session.id, subjectContext);
          }
          return;
        }

        // Normal initialization - check for existing session
        const sessionsRes = await fetch("/api/sessions");
        const sessionsData = await sessionsRes.json();

        if (sessionsData.activeSession) {
          setSession(sessionsData.activeSession);
          const messagesRes = await fetch(
            `/api/sessions/${sessionsData.activeSession.id}/messages`
          );
          const messagesData = await messagesRes.json();

          if (messagesData.messages?.length > 0) {
            setMessages(messagesData.messages);
          } else {
            addGreeting(sessionsData.activeSession.id);
          }
        } else {
          const newSessionRes = await fetch("/api/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_type: "freeform" }),
          });
          const newSessionData = await newSessionRes.json();

          if (newSessionData.session) {
            setSession(newSessionData.session);
            addGreeting(newSessionData.session.id);
          }
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      } finally {
        setIsInitializing(false);
      }
    }

    initializeChat();
  }, [subjectContext]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Add initial greeting message
  async function addGreeting(sessionId: string) {
    const audioHint = isAuditoryLearner
      ? " Tap the speaker icon on any message to hear it read out loud, or use the mic to speak your questions!"
      : "";

    const imageHint = isVisualLearner
      ? " You can upload photos of your textbooks or notes - just tap the camera icon!"
      : "";

    const greeting = learningProfile
      ? `Hey${studentName ? ` ${studentName}` : ""}! I'm your revision coach for the 2026 GCSEs. I can see you're ${
          learningProfile.isMultimodal
            ? "someone who learns in different ways"
            : `${learningProfile.primaryStyles[0]?.replace("_", " and ")} focused`
        } - so I'll make sure my tips work for you.${audioHint}${imageHint}

What subject do you want to tackle? You can also snap a pic of your textbook or notes and I'll help you revise from them!`
      : `Hey${studentName ? ` ${studentName}` : ""}! I'm your GCSE revision coach for 2026.

You can:
- Type your questions
- Tap the mic to speak
- Upload pics of textbooks, notes, or past papers

What do you need help with?`;

    const greetingMessage: Message = { role: "assistant", content: greeting };
    setMessages([greetingMessage]);

    try {
      await fetch(`/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "assistant",
          content: greeting,
          interaction_type: "greeting",
        }),
      });
    } catch (error) {
      console.error("Failed to save greeting:", error);
    }
  }

  // Add subject-focused greeting using resume context
  async function addSubjectGreeting(sessionId: string, context: SubjectContext) {
    const greeting = context.resumeMessage;

    const greetingMessage: Message = { role: "assistant", content: greeting };
    setMessages([greetingMessage]);

    try {
      await fetch(`/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "assistant",
          content: greeting,
          interaction_type: "greeting",
          subject_code: context.subjectCode,
        }),
      });
    } catch (error) {
      console.error("Failed to save subject greeting:", error);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // IMAGE UPLOAD (OCR via Google Vision)
  // ═══════════════════════════════════════════════════════════════

  function triggerImageUpload() {
    fileInputRef.current?.click();
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !session) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image file (JPG, PNG, or WebP)");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessingImage(true);

    try {
      // Add user message showing they uploaded an image
      const uploadMessage: Message = {
        role: "user",
        content: "Uploaded an image...",
        imagePreview: URL.createObjectURL(file),
      };
      setMessages((prev) => [...prev, uploadMessage]);

      // Call OCR API
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/vision/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();

      if (!data.text || data.text.trim() === "") {
        // No text found
        const noTextMessage: Message = {
          role: "assistant",
          content:
            "Hmm, I couldn't find any text in that image. Try uploading a clearer photo of your textbook, notes, or past paper. Make sure the text is visible and well-lit!",
        };
        setMessages((prev) => [...prev, noTextMessage]);

        await fetch(`/api/sessions/${session.id}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "assistant",
            content: noTextMessage.content,
            interaction_type: "feedback",
          }),
        });
        return;
      }

      // Save the OCR user message
      await fetch(`/api/sessions/${session.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: `[Uploaded image - ${data.contentType}]\n\nExtracted text:\n${data.text}`,
          interaction_type: "question",
        }),
      });

      // Use the suggested prompt from OCR API
      const promptToSend = data.suggestedPrompt || `I uploaded an image with this text:\n\n${data.text}\n\nCan you help me revise this?`;

      // Now send to chat API for processing
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: promptToSend },
          ],
          learningProfile: learningProfile
            ? {
                visual: learningProfile.visual,
                auditory: learningProfile.auditory,
                readWrite: learningProfile.readWrite,
                kinesthetic: learningProfile.kinesthetic,
                primaryStyles: learningProfile.primaryStyles,
                isMultimodal: learningProfile.isMultimodal,
              }
            : null,
          selectedSubjects: subjects,
          currentSubject: subjectContext
            ? {
                code: subjectContext.subjectCode,
                name: subjectContext.subjectName,
                nextTopic: subjectContext.nextTopic,
              }
            : null,
        }),
      });

      if (!chatResponse.ok) throw new Error("Failed to get AI response");

      // Stream the response
      const chatReader = chatResponse.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (chatReader) {
        const { done, value } = await chatReader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      }

      // Save assistant response
      await fetch(`/api/sessions/${session.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "assistant",
          content: assistantMessage,
          interaction_type: "explanation",
        }),
      });

      // Auto-play for auditory learners
      if (autoPlayEnabled && isAuditoryLearner && assistantMessage) {
        const newMessageIndex = messages.length + 1;
        setTimeout(() => {
          playMessageAudio(newMessageIndex, assistantMessage);
        }, 500);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Oops, I had trouble with that image. Try uploading a clearer photo!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessingImage(false);
      setUploadedImagePreview(null);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // VOICE INPUT (Speech-to-Text)
  // ═══════════════════════════════════════════════════════════════

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAudio();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
      alert("Can't access your microphone. Check your permissions!");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }

  async function transcribeAudio() {
    if (audioChunksRef.current.length === 0) return;

    setIsTranscribing(true);

    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("/api/speech/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Transcription failed");

      const data = await response.json();

      if (data.transcript && data.transcript.trim()) {
        setInput(data.transcript);
      }
    } catch (error) {
      console.error("Transcription error:", error);
    } finally {
      setIsTranscribing(false);
      audioChunksRef.current = [];
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // AUDIO PLAYBACK (Text-to-Speech via ElevenLabs)
  // ═══════════════════════════════════════════════════════════════

  async function playMessageAudio(messageIndex: number, text: string) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingMessageIndex === messageIndex) {
      setPlayingMessageIndex(null);
      return;
    }

    setIsLoadingAudio(true);
    setPlayingMessageIndex(messageIndex);

    try {
      // Try ElevenLabs first (better quality UK voices)
      let response = await fetch("/api/speech/elevenlabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: "lily", // Young British female
        }),
      });

      // Fallback to Google TTS if ElevenLabs fails
      if (!response.ok) {
        response = await fetch("/api/speech/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            voice: "default",
            speakingRate: 0.95,
          }),
        });
      }

      if (!response.ok) throw new Error("Synthesis failed");

      const data = await response.json();

      if (data.audioContent) {
        const audioSrc = `data:audio/mpeg;base64,${data.audioContent}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;

        audio.onended = () => {
          setPlayingMessageIndex(null);
          audioRef.current = null;
        };

        audio.onerror = () => {
          setPlayingMessageIndex(null);
          audioRef.current = null;
        };

        await audio.play();
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setPlayingMessageIndex(null);
    } finally {
      setIsLoadingAudio(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // MESSAGE SENDING
  // ═══════════════════════════════════════════════════════════════

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !session) return;

    const userMessage = input.trim();
    setInput("");

    const userMsg: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      await fetch(`/api/sessions/${session.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "user",
          content: userMessage,
          interaction_type: "question",
        }),
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          learningProfile: learningProfile
            ? {
                visual: learningProfile.visual,
                auditory: learningProfile.auditory,
                readWrite: learningProfile.readWrite,
                kinesthetic: learningProfile.kinesthetic,
                primaryStyles: learningProfile.primaryStyles,
                isMultimodal: learningProfile.isMultimodal,
              }
            : null,
          selectedSubjects: subjects,
          currentSubject: subjectContext
            ? {
                code: subjectContext.subjectCode,
                name: subjectContext.subjectName,
                nextTopic: subjectContext.nextTopic,
              }
            : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: assistantMessage,
          };
          return newMessages;
        });
      }

      await fetch(`/api/sessions/${session.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "assistant",
          content: assistantMessage,
          interaction_type: "explanation",
        }),
      });

      if (autoPlayEnabled && isAuditoryLearner && assistantMessage) {
        const newMessageIndex = messages.length;
        setTimeout(() => {
          playMessageAudio(newMessageIndex, assistantMessage);
        }, 500);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops, something went wrong. Give it another go!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate personalized prompts
  const getSuggestedPrompts = () => {
    if (!learningProfile) {
      return [
        "Best revision techniques?",
        "Help me make a timetable",
        "Upload a photo of my notes",
      ];
    }

    const primaryStyle = learningProfile.primaryStyles[0];

    const stylePrompts: Record<string, string[]> = {
      visual: [
        "Make me a mind map",
        "Best diagrams for Science",
        "Upload my textbook page",
      ],
      auditory: [
        "Explain this like a podcast",
        "Best ways to revise by listening",
        "Create a summary I can record",
      ],
      read_write: [
        "Create revision notes",
        "Best GCSE textbooks",
        "Summarise this topic for me",
      ],
      kinesthetic: [
        "Give me practice questions",
        "Hands-on revision ideas",
        "Past paper strategy",
      ],
    };

    return stylePrompts[primaryStyle] || stylePrompts.visual;
  };

  const suggestedPrompts = getSuggestedPrompts();

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  if (isInitializing) {
    return (
      <div className="flex flex-col h-[600px] bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-revision-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-neutral-500">
              Loading your revision session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl border border-neutral-200 shadow-sm">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
      />

      {/* Chat Header - White with green accent */}
      <div className="p-4 border-b border-neutral-200 bg-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back button when in subject context */}
            {subjectContext && onClearSubjectContext && (
              <button
                onClick={onClearSubjectContext}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition"
                title="Back to all subjects"
              >
                <BackIcon className="w-4 h-4 text-neutral-600" />
              </button>
            )}
            <div className="w-10 h-10 rounded-full bg-revision-green-100 flex items-center justify-center">
              <BrainIcon className="w-6 h-6 text-revision-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                {subjectContext ? subjectContext.subjectName : "revIsion Coach"}
              </h3>
              <p className="text-sm text-revision-green-600">
                {subjectContext
                  ? "Let's continue where you left off"
                  : learningProfile
                    ? `Tailored to how you learn`
                    : "Your AI Study Buddy"}
              </p>
            </div>
          </div>

          {/* Auto-play toggle for auditory learners */}
          {isAuditoryLearner && (
            <button
              onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition",
                autoPlayEnabled
                  ? "bg-revision-green-100 text-revision-green-700"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              )}
              title="Auto-play responses"
            >
              <SpeakerIcon className="w-4 h-4" />
              {autoPlayEnabled ? "Auto-play on" : "Auto-play"}
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-revision-green-500 text-white rounded-br-md"
                  : "bg-white text-neutral-900 rounded-bl-md border border-neutral-200 shadow-sm"
              )}
            >
              {/* Image preview for uploaded images */}
              {message.imagePreview && (
                <div className="mb-2">
                  <img
                    src={message.imagePreview}
                    alt="Uploaded"
                    className="max-w-[200px] max-h-[150px] rounded-lg object-cover"
                  />
                </div>
              )}

              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </p>

              {/* Audio playback button for assistant messages */}
              {message.role === "assistant" && message.content && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => playMessageAudio(index, message.content)}
                    disabled={isLoadingAudio && playingMessageIndex === index}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition",
                      playingMessageIndex === index
                        ? "bg-revision-green-100 text-revision-green-700"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                  >
                    {playingMessageIndex === index ? (
                      <>
                        <StopIcon className="w-3 h-3" />
                        <span>Stop</span>
                      </>
                    ) : isLoadingAudio && playingMessageIndex === index ? (
                      <>
                        <LoadingIcon className="w-3 h-3 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <SpeakerIcon className="w-3 h-3" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicators */}
        {(isLoading || isProcessingImage) &&
          messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2">
                  {isProcessingImage ? (
                    <>
                      <CameraIcon className="w-4 h-4 text-revision-green-500" />
                      <span className="text-sm text-revision-green-600">
                        Reading your image...
                      </span>
                    </>
                  ) : (
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-revision-green-400 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-revision-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-revision-green-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 bg-white">
          <p className="text-xs text-neutral-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  if (prompt.toLowerCase().includes("upload")) {
                    triggerImageUpload();
                  } else {
                    setInput(prompt);
                  }
                }}
                className="text-xs px-3 py-1.5 bg-revision-green-50 hover:bg-revision-green-100 rounded-full text-revision-green-700 transition flex items-center gap-1"
              >
                {prompt.toLowerCase().includes("upload") && (
                  <CameraIcon className="w-3 h-3" />
                )}
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 bg-white rounded-b-xl">
        <div className="flex gap-2 items-center">
          {/* Image Upload Button */}
          <button
            type="button"
            onClick={triggerImageUpload}
            disabled={isProcessingImage || isLoading}
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition",
              isProcessingImage
                ? "bg-revision-green-100 text-revision-green-500"
                : "bg-neutral-100 text-neutral-600 hover:bg-revision-green-50 hover:text-revision-green-600"
            )}
            title="Upload image (textbook, notes, past paper)"
          >
            {isProcessingImage ? (
              <LoadingIcon className="w-5 h-5 animate-spin" />
            ) : (
              <CameraIcon className="w-5 h-5" />
            )}
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isTranscribing || isLoading || isProcessingImage}
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition",
              isRecording
                ? "bg-revision-green-500 text-white animate-pulse"
                : isTranscribing
                  ? "bg-neutral-200 text-neutral-400"
                  : "bg-neutral-100 text-neutral-600 hover:bg-revision-green-50 hover:text-revision-green-600"
            )}
            title={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isTranscribing ? (
              <LoadingIcon className="w-5 h-5 animate-spin" />
            ) : (
              <MicrophoneIcon className="w-5 h-5" />
            )}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isRecording
                ? "Listening..."
                : isTranscribing
                  ? "Transcribing..."
                  : isProcessingImage
                    ? "Processing image..."
                    : "Type, speak, or upload a pic..."
            }
            className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-revision-green-500 focus:border-transparent"
            disabled={isLoading || isRecording || isTranscribing || isProcessingImage}
          />

          {/* Send Button */}
          <Button
            type="submit"
            disabled={
              isLoading ||
              !input.trim() ||
              isRecording ||
              isTranscribing ||
              isProcessingImage
            }
            className="bg-revision-green-500 hover:bg-revision-green-600 text-white"
          >
            Send
          </Button>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <p className="text-xs text-revision-green-600 mt-2 text-center">
            Recording... Tap the mic again to stop
          </p>
        )}
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function MicrophoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}
