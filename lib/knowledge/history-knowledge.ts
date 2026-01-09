// GCSE History Knowledge Bank
// Comprehensive coverage of popular exam board topics with key dates, events, and analysis

export interface HistoricalEvent {
  date: string;
  event: string;
  significance: string;
  keyFigures?: string[];
  examTip?: string;
}

export interface HistoricalPerson {
  name: string;
  dates: string;
  role: string;
  significance: string;
  keyActions: string[];
}

export interface SourceAnalysisTip {
  sourceType: string;
  whatToLookFor: string[];
  limitations: string[];
  usefulnessFactors: string[];
}

export interface HistoryTopic {
  name: string;
  examBoards: string[];
  timespan: string;
  overview: string;
  keyThemes: string[];
  timeline: HistoricalEvent[];
  keyFigures: HistoricalPerson[];
  examTips: string[];
  commonMistakes: string[];
}

// ═══════════════════════════════════════════════════════════
// GERMANY 1890-1945 (AQA, Edexcel)
// ═══════════════════════════════════════════════════════════

export const germanyTopic: HistoryTopic = {
  name: "Germany 1890-1945: Democracy and Dictatorship",
  examBoards: ["AQA 8145", "Edexcel 1HI0"],
  timespan: "1890-1945",
  overview: "The transformation of Germany from Kaiser Wilhelm II's empire through the Weimar Republic to Hitler's Nazi dictatorship, covering political, social, and economic changes.",
  keyThemes: [
    "The failure of democracy in Weimar Germany",
    "The rise of extremism (left and right)",
    "Economic instability and its political effects",
    "Hitler's consolidation of power",
    "Life in Nazi Germany - control and persecution",
    "Opposition and resistance"
  ],
  timeline: [
    // Wilhelmine Germany
    {
      date: "1888",
      event: "Wilhelm II becomes Kaiser",
      significance: "Beginning of personal rule and aggressive foreign policy",
      keyFigures: ["Kaiser Wilhelm II"],
      examTip: "Wilhelm's personality influenced Germany's path to WWI"
    },
    {
      date: "1890",
      event: "Bismarck dismissed",
      significance: "End of careful diplomacy, start of Weltpolitik (world policy)",
      keyFigures: ["Otto von Bismarck", "Kaiser Wilhelm II"]
    },
    // Weimar Republic
    {
      date: "9 November 1918",
      event: "Kaiser abdicates, Republic declared",
      significance: "End of German Empire, birth of democracy",
      keyFigures: ["Friedrich Ebert", "Philipp Scheidemann"],
      examTip: "Republic born from defeat - 'stab in the back' myth emerged"
    },
    {
      date: "January 1919",
      event: "Spartacist Uprising",
      significance: "Communist attempt to seize power, crushed by Freikorps",
      keyFigures: ["Rosa Luxemburg", "Karl Liebknecht"],
      examTip: "Shows early threats to Weimar from the LEFT"
    },
    {
      date: "28 June 1919",
      event: "Treaty of Versailles signed",
      significance: "Germany lost 13% territory, 10% population, army limited to 100,000, £6.6 billion reparations",
      examTip: "REMEMBER: LAMB - Land, Army, Money, Blame (Article 231)"
    },
    {
      date: "August 1919",
      event: "Weimar Constitution adopted",
      significance: "Established democratic system with proportional representation",
      examTip: "Article 48 allowed President to rule by decree - later exploited"
    },
    {
      date: "March 1920",
      event: "Kapp Putsch",
      significance: "Right-wing attempt to overthrow Weimar, defeated by general strike",
      keyFigures: ["Wolfgang Kapp"],
      examTip: "Shows early threats to Weimar from the RIGHT"
    },
    {
      date: "1923",
      event: "Hyperinflation crisis",
      significance: "German mark became worthless (4.2 trillion marks = $1), middle class savings destroyed",
      examTip: "Caused by reparations payments and French occupation of Ruhr"
    },
    {
      date: "8-9 November 1923",
      event: "Munich Beer Hall Putsch",
      significance: "Hitler's failed attempt to seize power, led to his imprisonment and writing Mein Kampf",
      keyFigures: ["Adolf Hitler", "Erich Ludendorff"],
      examTip: "Hitler learned to seek power through legal means after this"
    },
    {
      date: "1924",
      event: "Dawes Plan",
      significance: "Reorganised reparations payments, US loans helped German recovery",
      keyFigures: ["Gustav Stresemann"],
      examTip: "Start of 'Golden Years' but Germany dependent on US loans"
    },
    {
      date: "1925",
      event: "Locarno Treaties",
      significance: "Germany accepted western borders, improved relations with France/Britain",
      keyFigures: ["Gustav Stresemann"]
    },
    {
      date: "1926",
      event: "Germany joins League of Nations",
      significance: "Return to international respectability",
      keyFigures: ["Gustav Stresemann"]
    },
    {
      date: "1928",
      event: "Nazi Party wins only 2.6% of vote",
      significance: "Shows Nazis were marginal during prosperity",
      examTip: "Compare to 1932 - economic crisis changed everything"
    },
    {
      date: "October 1929",
      event: "Wall Street Crash",
      significance: "US recalled loans, German economy collapsed, unemployment soared",
      examTip: "THE key turning point for Nazi rise - economic crisis = political extremism"
    },
    {
      date: "1930",
      event: "Nazi Party wins 18.3% of vote (107 seats)",
      significance: "Major breakthrough, became second largest party",
      examTip: "Correlation between unemployment and Nazi votes"
    },
    {
      date: "July 1932",
      event: "Nazi Party wins 37.3% (230 seats) - highest ever",
      significance: "Largest party but not majority, Hitler demanded chancellorship",
      keyFigures: ["Adolf Hitler", "Heinrich Brüning", "Franz von Papen"]
    },
    // Nazi Germany
    {
      date: "30 January 1933",
      event: "Hitler appointed Chancellor",
      significance: "Legal path to power, invited by President Hindenburg",
      keyFigures: ["Adolf Hitler", "Paul von Hindenburg", "Franz von Papen"],
      examTip: "Papen thought he could 'control' Hitler - fatal miscalculation"
    },
    {
      date: "27 February 1933",
      event: "Reichstag Fire",
      significance: "Blamed on communists, used to justify emergency powers",
      keyFigures: ["Marinus van der Lubbe"],
      examTip: "Still debated whether Nazis started it themselves"
    },
    {
      date: "28 February 1933",
      event: "Decree for Protection of People and State",
      significance: "Suspended civil liberties, enabled mass arrests of opponents",
      examTip: "First step in dismantling democracy legally"
    },
    {
      date: "23 March 1933",
      event: "Enabling Act passed",
      significance: "Hitler could make laws without Reichstag, effectively ended democracy",
      examTip: "Needed 2/3 majority - got it by banning KPD and intimidating others"
    },
    {
      date: "2 May 1933",
      event: "Trade unions banned",
      significance: "Workers' organisations replaced by Nazi DAF (German Labour Front)"
    },
    {
      date: "14 July 1933",
      event: "Law against formation of new parties",
      significance: "Germany became one-party state"
    },
    {
      date: "30 June 1934",
      event: "Night of the Long Knives",
      significance: "Hitler purged SA leadership, secured army support",
      keyFigures: ["Ernst Röhm", "Heinrich Himmler", "SS"],
      examTip: "Shows Hitler willing to murder even loyal supporters"
    },
    {
      date: "2 August 1934",
      event: "Hindenburg dies, Hitler becomes Führer",
      significance: "Combined President and Chancellor roles, army swore personal oath",
      examTip: "Consolidation complete - Hitler now had absolute power"
    },
    {
      date: "15 September 1935",
      event: "Nuremberg Laws",
      significance: "Jews stripped of citizenship, marriage to 'Aryans' forbidden",
      examTip: "Legal persecution - shows systematic nature of antisemitism"
    },
    {
      date: "1936",
      event: "Berlin Olympics",
      significance: "Nazi propaganda showcase, antisemitic signs temporarily removed",
      keyFigures: ["Jesse Owens"]
    },
    {
      date: "9-10 November 1938",
      event: "Kristallnacht (Night of Broken Glass)",
      significance: "Coordinated attacks on Jewish businesses, synagogues; 91 killed, 30,000 sent to camps",
      examTip: "Turning point from legal persecution to violent persecution"
    },
    {
      date: "1 September 1939",
      event: "Germany invades Poland",
      significance: "Start of World War II"
    },
    {
      date: "20 January 1942",
      event: "Wannsee Conference",
      significance: "Nazi leaders planned 'Final Solution' - systematic murder of Jews",
      keyFigures: ["Reinhard Heydrich", "Adolf Eichmann"],
      examTip: "Shows bureaucratic planning of genocide"
    }
  ],
  keyFigures: [
    {
      name: "Kaiser Wilhelm II",
      dates: "1859-1941",
      role: "German Emperor 1888-1918",
      significance: "His aggressive foreign policy and militarism contributed to WWI",
      keyActions: ["Dismissed Bismarck", "Built up navy", "Gave 'blank cheque' to Austria-Hungary 1914"]
    },
    {
      name: "Friedrich Ebert",
      dates: "1871-1925",
      role: "First President of Weimar Republic 1919-1925",
      significance: "SPD leader who tried to stabilise democracy",
      keyActions: ["Crushed Spartacist uprising", "Signed Weimar Constitution", "Used Article 48"]
    },
    {
      name: "Gustav Stresemann",
      dates: "1878-1929",
      role: "Chancellor (1923) and Foreign Minister (1923-1929)",
      significance: "Architect of Weimar's 'Golden Years'",
      keyActions: ["Introduced Rentenmark", "Negotiated Dawes Plan", "Signed Locarno Treaties", "Won Nobel Peace Prize"]
    },
    {
      name: "Adolf Hitler",
      dates: "1889-1945",
      role: "Führer of Nazi Germany 1934-1945",
      significance: "Dictator who caused WWII and the Holocaust",
      keyActions: ["Munich Putsch", "Wrote Mein Kampf", "Became Chancellor legally", "Persecuted Jews", "Started WWII"]
    },
    {
      name: "Heinrich Himmler",
      dates: "1900-1945",
      role: "Head of SS and Gestapo",
      significance: "Oversaw Nazi terror apparatus and concentration camps",
      keyActions: ["Organised Night of Long Knives", "Ran concentration camps", "Oversaw Holocaust"]
    },
    {
      name: "Joseph Goebbels",
      dates: "1897-1945",
      role: "Minister of Propaganda",
      significance: "Controlled Nazi messaging and indoctrination",
      keyActions: ["Book burnings", "Controlled media", "Organised rallies", "Spread antisemitism"]
    }
  ],
  examTips: [
    "Know the difference between CAUSES of Nazi rise (economic, political, social) and HOW Hitler consolidated power",
    "Weimar Republic: weaknesses were built-in (Article 48, proportional representation) but it survived 1919-1923 crises",
    "Depression was the KEY factor in Nazi rise - always link to unemployment statistics",
    "Hitler's consolidation 1933-34: Reichstag Fire → Enabling Act → Banning parties → Night of Long Knives → Hindenburg's death",
    "Life in Nazi Germany: distinguish between support (KdF, employment), fear (Gestapo, camps), and resistance (White Rose, Edelweiss Pirates)",
    "Source questions: consider PURPOSE (propaganda vs private), ORIGIN (Nazi vs foreign), and TYPICALITY"
  ],
  commonMistakes: [
    "Confusing hyperinflation (1923) with the Depression (1929-33) - different causes and effects",
    "Saying Hitler 'seized' power - he was legally appointed Chancellor",
    "Forgetting that Nazi vote FELL in November 1932 (33%) - backroom deal made Hitler Chancellor",
    "Oversimplifying German support - many Germans were indifferent, not enthusiastic Nazis",
    "Ignoring women's experiences - Nazis wanted them as mothers (Kinder, Küche, Kirche)",
    "Treating persecution as sudden - it escalated gradually from 1933 to 1945"
  ]
};

// ═══════════════════════════════════════════════════════════
// ELIZABETHAN ENGLAND 1558-1603 (AQA, Edexcel)
// ═══════════════════════════════════════════════════════════

export const elizabethanTopic: HistoryTopic = {
  name: "Elizabethan England 1558-1603",
  examBoards: ["AQA 8145", "Edexcel 1HI0"],
  timespan: "1558-1603",
  overview: "The reign of Elizabeth I, covering religious settlement, threats to her rule, society and culture, and exploration.",
  keyThemes: [
    "The Elizabethan Religious Settlement and its challenges",
    "Mary Queen of Scots and Catholic plots",
    "War with Spain and the Armada",
    "Elizabethan society and the problem of the poor",
    "Education, leisure, and theatre",
    "Voyages of exploration (Drake, Raleigh)"
  ],
  timeline: [
    {
      date: "17 November 1558",
      event: "Elizabeth I becomes Queen",
      significance: "Protestant queen after Catholic Mary I, faced religious divisions",
      keyFigures: ["Elizabeth I"],
      examTip: "Elizabeth was 25, unmarried, Protestant - all seen as weaknesses"
    },
    {
      date: "1559",
      event: "Act of Supremacy and Act of Uniformity",
      significance: "Elizabethan Religious Settlement - Protestant Church with some Catholic elements",
      examTip: "'Middle Way' - tried to please both sides but satisfied neither extreme"
    },
    {
      date: "1566",
      event: "Parliament pressures Elizabeth to marry/name successor",
      significance: "Shows tension between Queen and Parliament over succession",
      examTip: "Elizabeth's refusal to marry was a constant political issue"
    },
    {
      date: "1568",
      event: "Mary Queen of Scots arrives in England",
      significance: "Catholic claimant to throne became focus of plots",
      keyFigures: ["Mary Queen of Scots"],
      examTip: "Mary was a threat for 19 years - Elizabeth reluctant to execute a fellow queen"
    },
    {
      date: "1569",
      event: "Northern Rebellion",
      significance: "Catholic earls' revolt, easily crushed, 800 executed",
      keyFigures: ["Earl of Northumberland", "Earl of Westmorland"],
      examTip: "First major Catholic threat - showed support for Mary QoS in the North"
    },
    {
      date: "1570",
      event: "Pope Pius V excommunicates Elizabeth",
      significance: "Catholics released from allegiance to Elizabeth, encouraged plots",
      examTip: "Made all Catholics potential traitors in government eyes"
    },
    {
      date: "1571",
      event: "Ridolfi Plot",
      significance: "Spanish-backed plot to replace Elizabeth with Mary",
      keyFigures: ["Roberto Ridolfi", "Duke of Norfolk"]
    },
    {
      date: "1580",
      event: "Drake completes circumnavigation",
      significance: "First Englishman to sail around the world, brought back £400,000 in treasure",
      keyFigures: ["Francis Drake"],
      examTip: "Knighted on the Golden Hinde - shows Elizabeth supported his 'piracy'"
    },
    {
      date: "1583",
      event: "Throckmorton Plot",
      significance: "Spanish invasion planned, discovered by Walsingham's spies",
      keyFigures: ["Francis Throckmorton", "Francis Walsingham"]
    },
    {
      date: "1585",
      event: "Raleigh's first Roanoke colony",
      significance: "Failed attempt to colonise Virginia",
      keyFigures: ["Walter Raleigh"],
      examTip: "Later 'Lost Colony' (1587) disappeared - mystery never solved"
    },
    {
      date: "1586",
      event: "Babington Plot",
      significance: "Mary QoS directly implicated thanks to Walsingham's trap",
      keyFigures: ["Anthony Babington", "Francis Walsingham"],
      examTip: "Walsingham intercepted and decoded letters - Mary condemned herself"
    },
    {
      date: "8 February 1587",
      event: "Mary Queen of Scots executed",
      significance: "Removed Catholic figurehead but gave Spain justification for war",
      keyFigures: ["Mary Queen of Scots"],
      examTip: "Elizabeth signed warrant reluctantly, blamed secretary afterwards"
    },
    {
      date: "July-August 1588",
      event: "Spanish Armada defeated",
      significance: "130 Spanish ships sailed, only 67 returned; English fireships and storms decisive",
      keyFigures: ["Duke of Medina Sidonia", "Francis Drake", "Lord Howard"],
      examTip: "Spanish plan: collect army from Netherlands - coordination failed"
    },
    {
      date: "1598",
      event: "Poor Law consolidated",
      significance: "Parish-based system: deserving poor helped, able-bodied poor put to work in Houses of Correction",
      examTip: "Distinction between 'deserving' and 'undeserving' poor was key"
    },
    {
      date: "24 March 1603",
      event: "Elizabeth I dies",
      significance: "End of Tudor dynasty, James VI of Scotland becomes James I of England",
      keyFigures: ["James I"]
    }
  ],
  keyFigures: [
    {
      name: "Elizabeth I",
      dates: "1533-1603",
      role: "Queen of England 1558-1603",
      significance: "Survived religious conflict, defeat of Armada, presided over cultural 'Golden Age'",
      keyActions: ["Religious Settlement", "Never married", "Executed Mary QoS", "Defeated Armada"]
    },
    {
      name: "William Cecil (Lord Burghley)",
      dates: "1520-1598",
      role: "Principal Secretary, then Lord Treasurer",
      significance: "Elizabeth's most trusted advisor for 40 years",
      keyActions: ["Managed finances", "Advised on Mary QoS", "Protestant but moderate"]
    },
    {
      name: "Francis Walsingham",
      dates: "1532-1590",
      role: "Principal Secretary and Spymaster",
      significance: "Created spy network that uncovered Catholic plots",
      keyActions: ["Discovered Babington Plot", "Trapped Mary QoS", "Pushed for her execution"]
    },
    {
      name: "Mary Queen of Scots",
      dates: "1542-1587",
      role: "Queen of Scotland, Catholic claimant to English throne",
      significance: "Focus of Catholic plots for 19 years until execution",
      keyActions: ["Fled Scotland 1568", "Centre of plots", "Executed 1587"]
    },
    {
      name: "Francis Drake",
      dates: "1540-1596",
      role: "Privateer, Explorer, Naval Commander",
      significance: "Circumnavigated world, helped defeat Armada",
      keyActions: ["Raided Spanish treasure", "Sailed around world", "Attacked Armada"]
    },
    {
      name: "Walter Raleigh",
      dates: "1552-1618",
      role: "Explorer, Courtier",
      significance: "Attempted American colonisation, Elizabeth's favourite",
      keyActions: ["Organised Roanoke colonies", "Introduced tobacco/potatoes", "Later executed by James I"]
    }
  ],
  examTips: [
    "Religious Settlement: know the THREE parts (Supremacy, Uniformity, Injunctions) and what each did",
    "Plots: each had foreign involvement (Spain/Pope) - shows Elizabeth faced international Catholic threat",
    "Armada: multiple factors in defeat - English tactics, Spanish mistakes, weather ('Protestant Wind')",
    "Poverty: know the CAUSES (enclosure, population growth, inflation, harvest failures, dissolution of monasteries)",
    "Theatre: Shakespeare, Marlowe - but remember theatre was controversial (Puritans opposed it)",
    "Exploration: motivated by gold, glory, spreading Protestantism, and challenging Spain"
  ],
  commonMistakes: [
    "Saying Armada was destroyed by weather alone - English tactics (fireships) were crucial",
    "Forgetting Elizabeth's problems: unmarried, female, Protestant, bastard in Catholic eyes",
    "Treating all Catholics as traitors - most were loyal subjects who just wanted to practise their faith",
    "Ignoring Puritan threat - they wanted Church to go further Protestant, challenged Settlement",
    "Oversimplifying poverty - it was complex with 'deserving' and 'undeserving' categories",
    "Thinking Drake was officially a naval officer - he was really a privateer (legal pirate)"
  ]
};

// ═══════════════════════════════════════════════════════════
// CONFLICT AND TENSION: WWI 1894-1918 (AQA)
// ═══════════════════════════════════════════════════════════

export const ww1Topic: HistoryTopic = {
  name: "Conflict and Tension: The First World War 1894-1918",
  examBoards: ["AQA 8145"],
  timespan: "1894-1918",
  overview: "The causes, events, and consequences of World War I, including alliance systems, the Western Front, and the peace settlement.",
  keyThemes: [
    "Alliance system and arms race",
    "Causes of WWI - long-term and short-term",
    "The Schlieffen Plan and trench warfare",
    "Key battles on the Western Front",
    "New technology and tactics",
    "The end of the war and Treaty of Versailles"
  ],
  timeline: [
    {
      date: "1882",
      event: "Triple Alliance formed",
      significance: "Germany, Austria-Hungary, Italy allied against France",
      examTip: "Italy later switched sides in 1915"
    },
    {
      date: "1894",
      event: "Franco-Russian Alliance",
      significance: "France and Russia allied - Germany now faced war on two fronts",
      examTip: "This is why Schlieffen Plan was created"
    },
    {
      date: "1898",
      event: "German Naval Laws begin",
      significance: "Germany building fleet to rival Britain's Royal Navy",
      keyFigures: ["Kaiser Wilhelm II", "Alfred von Tirpitz"],
      examTip: "Naval race increased Anglo-German tension"
    },
    {
      date: "1904",
      event: "Entente Cordiale",
      significance: "Britain and France settle colonial disputes, become closer",
      examTip: "Not a military alliance but ended centuries of Anglo-French rivalry"
    },
    {
      date: "1905",
      event: "First Moroccan Crisis",
      significance: "Germany challenged French influence in Morocco, backed down at conference",
      keyFigures: ["Kaiser Wilhelm II"],
      examTip: "Strengthened Anglo-French relations, isolated Germany"
    },
    {
      date: "1907",
      event: "Triple Entente formed",
      significance: "Britain, France, Russia aligned - Europe divided into two camps",
      examTip: "Still not binding alliance but Germany felt 'encircled'"
    },
    {
      date: "1908",
      event: "Bosnian Crisis",
      significance: "Austria-Hungary annexed Bosnia, angering Serbia and Russia",
      examTip: "Russia backed down but vowed never again - explains 1914 reaction"
    },
    {
      date: "1911",
      event: "Agadir Crisis (Second Moroccan Crisis)",
      significance: "Germany sent gunboat, Britain supported France strongly",
      examTip: "Germany backed down again, felt humiliated"
    },
    {
      date: "1912-1913",
      event: "Balkan Wars",
      significance: "Serbia doubled in size, Austria-Hungary alarmed",
      examTip: "Balkans called 'powder keg of Europe'"
    },
    {
      date: "28 June 1914",
      event: "Assassination of Franz Ferdinand",
      significance: "Austrian heir killed in Sarajevo by Serbian nationalist",
      keyFigures: ["Archduke Franz Ferdinand", "Gavrilo Princip"],
      examTip: "The TRIGGER not the cause - tensions already existed"
    },
    {
      date: "28 July 1914",
      event: "Austria-Hungary declares war on Serbia",
      significance: "Blank cheque from Germany emboldened Austria",
      examTip: "Alliance system now pulled in other powers"
    },
    {
      date: "1-4 August 1914",
      event: "War declarations cascade",
      significance: "Germany declared war on Russia (1st), France (3rd); invaded Belgium (4th); Britain declared war on Germany (4th)",
      examTip: "Belgian neutrality brought Britain in"
    },
    {
      date: "September 1914",
      event: "Battle of the Marne",
      significance: "Schlieffen Plan failed, Germans stopped outside Paris",
      examTip: "Led to 'Race to the Sea' and trench warfare"
    },
    {
      date: "October-November 1914",
      event: "First Battle of Ypres",
      significance: "Established trench lines from Switzerland to North Sea"
    },
    {
      date: "22 April 1915",
      event: "Second Battle of Ypres - first gas attack",
      significance: "Germans used chlorine gas, new horror of chemical warfare",
      examTip: "Gas was unreliable (could blow back) but terrifying"
    },
    {
      date: "25 April 1915",
      event: "Gallipoli landings",
      significance: "Allied attempt to knock out Ottoman Turkey, failed badly",
      keyFigures: ["Winston Churchill"],
      examTip: "Alternative to Western Front stalemate"
    },
    {
      date: "July-November 1916",
      event: "Battle of the Somme",
      significance: "1 million casualties; 57,000 British on first day alone",
      keyFigures: ["Douglas Haig"],
      examTip: "Debate: was Haig a 'butcher' or did tactics improve?"
    },
    {
      date: "February-December 1916",
      event: "Battle of Verdun",
      significance: "German attempt to 'bleed France white'; 700,000 total casualties",
      examTip: "French motto: 'They shall not pass' (Ils ne passeront pas)"
    },
    {
      date: "31 May 1916",
      event: "Battle of Jutland",
      significance: "Largest naval battle; Britain lost more ships but Germany never challenged again",
      examTip: "Strategic British victory - German fleet stayed in port"
    },
    {
      date: "September 1916",
      event: "Tanks first used at the Somme",
      significance: "New technology but unreliable; improved later",
      examTip: "Tanks eventually helped break stalemate"
    },
    {
      date: "April 1917",
      event: "USA enters the war",
      significance: "Fresh troops and resources for Allies; result of unrestricted submarine warfare and Zimmermann Telegram",
      keyFigures: ["Woodrow Wilson"],
      examTip: "Took time to mobilise but tilted balance decisively"
    },
    {
      date: "July-November 1917",
      event: "Third Battle of Ypres (Passchendaele)",
      significance: "475,000 casualties for 5 miles; mud and horror",
      keyFigures: ["Douglas Haig"],
      examTip: "Symbolises futility of Western Front"
    },
    {
      date: "November 1917",
      event: "Battle of Cambrai - mass tank attack",
      significance: "476 tanks used; showed potential of tanks",
      examTip: "Gains lost to German counter-attack"
    },
    {
      date: "March 1918",
      event: "German Spring Offensive (Ludendorff Offensive)",
      significance: "Last German attempt to win before US troops arrived in force",
      keyFigures: ["Erich Ludendorff"],
      examTip: "Initial success but overextended"
    },
    {
      date: "August-November 1918",
      event: "Hundred Days Offensive",
      significance: "Allied final push; combined arms tactics broke German lines",
      examTip: "British/Commonwealth forces played major role"
    },
    {
      date: "11 November 1918",
      event: "Armistice signed",
      significance: "Fighting ended at 11am on 11th day of 11th month",
      examTip: "Germany not invaded - led to 'stab in the back' myth"
    },
    {
      date: "28 June 1919",
      event: "Treaty of Versailles signed",
      significance: "Germany lost territory, military limited, £6.6bn reparations, war guilt clause",
      keyFigures: ["Woodrow Wilson", "David Lloyd George", "Georges Clemenceau"],
      examTip: "LAMB: Land, Army, Money, Blame"
    }
  ],
  keyFigures: [
    {
      name: "Kaiser Wilhelm II",
      dates: "1859-1941",
      role: "German Emperor",
      significance: "Aggressive foreign policy and Weltpolitik contributed to tensions",
      keyActions: ["Built navy", "Moroccan crises", "Gave 'blank cheque' to Austria"]
    },
    {
      name: "Douglas Haig",
      dates: "1861-1928",
      role: "Commander of British Expeditionary Force 1915-1918",
      significance: "Controversial - led army through Somme, Passchendaele, final victory",
      keyActions: ["Somme offensive", "Passchendaele", "Hundred Days"]
    },
    {
      name: "Woodrow Wilson",
      dates: "1856-1924",
      role: "US President",
      significance: "Brought USA into war, proposed Fourteen Points for peace",
      keyActions: ["Declared war April 1917", "Fourteen Points", "League of Nations"]
    },
    {
      name: "Georges Clemenceau",
      dates: "1841-1929",
      role: "French Prime Minister 'The Tiger'",
      significance: "Wanted harsh peace to punish Germany",
      keyActions: ["Demanded security guarantees", "Pushed for reparations"]
    }
  ],
  examTips: [
    "Long-term causes (MAIN): Militarism, Alliances, Imperialism, Nationalism",
    "Assassination was TRIGGER not CAUSE - distinguish in answers",
    "Schlieffen Plan: quick victory over France, then turn on Russia - failed at Marne",
    "Trench warfare: NOT just 'lions led by donkeys' - tactics evolved throughout war",
    "Somme debate: Haig controversial but army learned and improved",
    "Treaty of Versailles: know why each of Big Three wanted different things"
  ],
  commonMistakes: [
    "Saying WWI started because of assassination - it was the trigger, not cause",
    "Thinking trenches were the whole war - there were other fronts and naval war",
    "Oversimplifying Haig as a 'butcher' - it's more complex",
    "Forgetting technology changed (tanks, planes, gas) - not static",
    "Thinking USA won the war alone - they arrived late but tilted balance",
    "Not understanding why Germany felt Versailles was unfair"
  ]
};

// ═══════════════════════════════════════════════════════════
// MEDICINE THROUGH TIME (Edexcel)
// ═══════════════════════════════════════════════════════════

export const medicineTopic: HistoryTopic = {
  name: "Medicine Through Time c.1250-present",
  examBoards: ["Edexcel 1HI0"],
  timespan: "c.1250-present",
  overview: "The development of medical knowledge, public health, and treatment from medieval times to the present day.",
  keyThemes: [
    "Ideas about disease causation",
    "Approaches to treatment and prevention",
    "Role of the Church, government, individuals",
    "Factors: war, technology, chance, communication",
    "Case studies: Black Death, Great Plague, cholera"
  ],
  timeline: [
    {
      date: "c.1250-1500",
      event: "Medieval Medicine",
      significance: "Church controlled learning, Galen and Hippocrates dominant, Four Humours theory",
      examTip: "Church PREVENTED progress by banning dissection and questioning"
    },
    {
      date: "1348-1349",
      event: "Black Death arrives in England",
      significance: "Killed 1/3 of population; blamed on God, miasma, Jews, astrology",
      examTip: "Responses included flagellants, prayers, quarantine, bloodletting"
    },
    {
      date: "1543",
      event: "Vesalius publishes 'On the Fabric of the Human Body'",
      significance: "First accurate anatomy book based on dissection, proved Galen wrong",
      keyFigures: ["Andreas Vesalius"],
      examTip: "Vesalius OBSERVED rather than just accepting Galen"
    },
    {
      date: "1628",
      event: "Harvey publishes 'On the Motion of the Heart and Blood'",
      significance: "Proved blood circulates, heart is pump - contradicted Galen",
      keyFigures: ["William Harvey"],
      examTip: "Harvey used EXPERIMENTS and observation"
    },
    {
      date: "1665",
      event: "Great Plague of London",
      significance: "70,000+ deaths; quarantine, red crosses, plague doctors",
      examTip: "Compare responses to Black Death - some similar (prayer) some improved (quarantine)"
    },
    {
      date: "1798",
      event: "Jenner develops vaccination",
      significance: "Smallpox vaccine using cowpox; first scientific vaccination",
      keyFigures: ["Edward Jenner"],
      examTip: "Jenner didn't know WHY it worked (germ theory came later)"
    },
    {
      date: "1842",
      event: "Chadwick's Report on Sanitary Conditions",
      significance: "Linked poverty to disease, called for clean water and sewers",
      keyFigures: ["Edwin Chadwick"],
      examTip: "Government still reluctant to intervene (laissez-faire)"
    },
    {
      date: "1847",
      event: "Simpson uses chloroform anaesthetic",
      significance: "Made surgery pain-free but initially opposed (especially for childbirth)",
      keyFigures: ["James Simpson"],
      examTip: "Queen Victoria used it in 1853 - changed public opinion"
    },
    {
      date: "1848",
      event: "First Public Health Act",
      significance: "Allowed (not required) towns to set up health boards",
      examTip: "Limited impact because it was not compulsory"
    },
    {
      date: "1854",
      event: "Snow's Broad Street pump investigation",
      significance: "Proved cholera spread by water, not miasma",
      keyFigures: ["John Snow"],
      examTip: "Used SCIENTIFIC METHOD - mapping cases"
    },
    {
      date: "1861",
      event: "Germ Theory published by Pasteur",
      significance: "Proved microbes cause decay - revolution in understanding disease",
      keyFigures: ["Louis Pasteur"],
      examTip: "Pasteur didn't identify which germs caused which diseases"
    },
    {
      date: "1867",
      event: "Lister uses carbolic acid antiseptic",
      significance: "Reduced surgical deaths by killing germs",
      keyFigures: ["Joseph Lister"],
      examTip: "Applied Pasteur's germ theory to surgery"
    },
    {
      date: "1875",
      event: "Second Public Health Act",
      significance: "COMPULSORY - councils must provide clean water, sewers, street cleaning",
      examTip: "Government intervention now accepted after cholera epidemics"
    },
    {
      date: "1876-1879",
      event: "Koch identifies specific disease-causing bacteria",
      significance: "Identified anthrax and TB bacteria, developed new techniques",
      keyFigures: ["Robert Koch"],
      examTip: "Koch built on Pasteur - identified WHICH germs caused WHICH diseases"
    },
    {
      date: "1881-1882",
      event: "Pasteur develops vaccines for anthrax and rabies",
      significance: "Applied germ theory to create vaccines",
      keyFigures: ["Louis Pasteur"]
    },
    {
      date: "1905",
      event: "Magic bullet: Salvarsan 606 for syphilis",
      significance: "First chemical cure targeting specific disease",
      keyFigures: ["Paul Ehrlich"],
      examTip: "Lead to later magic bullets like Prontosil and antibiotics"
    },
    {
      date: "1909",
      event: "Old Age Pensions introduced",
      significance: "Government takes responsibility for welfare",
      keyFigures: ["David Lloyd George"],
      examTip: "Liberal reforms start government health intervention"
    },
    {
      date: "1911",
      event: "National Insurance Act",
      significance: "Workers got sick pay and free doctor treatment",
      keyFigures: ["David Lloyd George"],
      examTip: "Only for workers, not families"
    },
    {
      date: "1914-1918",
      event: "WWI medical advances",
      significance: "Blood transfusions, X-rays for finding bullets, plastic surgery, brain surgery",
      examTip: "WAR = factor accelerating medical progress"
    },
    {
      date: "1928",
      event: "Fleming discovers penicillin",
      significance: "First antibiotic - but couldn't produce in quantity",
      keyFigures: ["Alexander Fleming"],
      examTip: "CHANCE discovery (contaminated petri dish)"
    },
    {
      date: "1942",
      event: "Florey and Chain mass-produce penicillin",
      significance: "WWII funding enabled mass production, saved millions",
      keyFigures: ["Howard Florey", "Ernst Chain"],
      examTip: "WAR funding essential for development"
    },
    {
      date: "1948",
      event: "NHS founded",
      significance: "Free healthcare for all at point of use",
      keyFigures: ["Aneurin Bevan"],
      examTip: "Revolutionary - opposed by doctors and Conservatives initially"
    },
    {
      date: "1953",
      event: "DNA structure discovered",
      significance: "Foundation for genetic medicine and personalised treatment",
      keyFigures: ["Watson", "Crick", "Franklin", "Wilkins"]
    },
    {
      date: "2000",
      event: "Human Genome Project completed",
      significance: "Full mapping of human DNA enables targeted treatments"
    }
  ],
  keyFigures: [
    {
      name: "Hippocrates",
      dates: "c.460-370 BC",
      role: "Greek physician",
      significance: "Clinical observation, Four Humours theory, Hippocratic Oath",
      keyActions: ["Separated medicine from religion", "Observation of symptoms"]
    },
    {
      name: "Galen",
      dates: "c.129-216 AD",
      role: "Roman physician",
      significance: "Dominated medicine for 1500 years, some errors from animal dissection",
      keyActions: ["Wrote medical textbooks", "Theory of Opposites for treatment"]
    },
    {
      name: "Andreas Vesalius",
      dates: "1514-1564",
      role: "Renaissance anatomist",
      significance: "First accurate anatomy based on human dissection",
      keyActions: ["Dissected humans", "Proved Galen wrong about jaw", "Published illustrated book"]
    },
    {
      name: "William Harvey",
      dates: "1578-1657",
      role: "English physician",
      significance: "Discovered blood circulation",
      keyActions: ["Experiments on hearts", "Proved blood circulates", "Used scientific method"]
    },
    {
      name: "Edward Jenner",
      dates: "1749-1823",
      role: "English doctor",
      significance: "Developed vaccination against smallpox",
      keyActions: ["Observed milkmaids", "Tested on James Phipps", "Published findings"]
    },
    {
      name: "Louis Pasteur",
      dates: "1822-1895",
      role: "French scientist",
      significance: "Germ Theory - microbes cause disease",
      keyActions: ["Disproved spontaneous generation", "Developed vaccines", "Pasteurisation"]
    },
    {
      name: "Robert Koch",
      dates: "1843-1910",
      role: "German scientist",
      significance: "Identified specific bacteria causing specific diseases",
      keyActions: ["Identified anthrax, TB, cholera bacteria", "Developed staining techniques"]
    },
    {
      name: "Alexander Fleming",
      dates: "1881-1955",
      role: "Scottish scientist",
      significance: "Discovered penicillin by chance",
      keyActions: ["Left petri dish uncovered", "Noticed mould killed bacteria", "Published findings"]
    }
  ],
  examTips: [
    "Know the FACTORS: war, chance, individuals, government, communication, science/technology",
    "Medieval: Church PREVENTED progress, Galen couldn't be questioned",
    "Renaissance: Vesalius and Harvey used OBSERVATION and EXPERIMENTS",
    "19th century: Germ Theory = biggest breakthrough, enabled vaccination and antiseptics",
    "Public Health: government involvement grew over time (laissez-faire to intervention)",
    "20th century: WWI and WWII accelerated progress (funding, need, research)"
  ],
  commonMistakes: [
    "Saying progress was steady - there were periods of regression (after Rome fell)",
    "Forgetting the role of CHANCE (Jenner, Fleming) alongside science",
    "Not linking individuals to factors (Fleming = chance, Pasteur = science)",
    "Thinking NHS was universally welcomed - doctors opposed it initially",
    "Ignoring continuity - some medieval ideas persisted into 19th century",
    "Treating Public Health as just about sewers - it's about government responsibility"
  ]
};

// ═══════════════════════════════════════════════════════════
// SOURCE ANALYSIS SKILLS
// ═══════════════════════════════════════════════════════════

export const sourceAnalysisTips: SourceAnalysisTip[] = [
  {
    sourceType: "Photograph",
    whatToLookFor: [
      "Who took it and why?",
      "What is shown AND not shown?",
      "Is it posed or candid?",
      "Has it been cropped or edited?"
    ],
    limitations: [
      "Only shows one moment",
      "May be posed/staged",
      "Photographer chose angle and framing",
      "Context may be missing"
    ],
    usefulnessFactors: [
      "Visual evidence of events/conditions",
      "Can show everyday life",
      "May reveal propaganda intentions"
    ]
  },
  {
    sourceType: "Poster/Propaganda",
    whatToLookFor: [
      "Who produced it? Government, political party, campaign group?",
      "What message is it trying to convey?",
      "What techniques are used? Colour, imagery, slogans?",
      "Who was the target audience?"
    ],
    limitations: [
      "Deliberately biased - designed to persuade",
      "May exaggerate or lie",
      "Shows official view, not reality",
      "Doesn't tell us if people believed it"
    ],
    usefulnessFactors: [
      "Shows what authorities wanted people to think",
      "Reveals government priorities/fears",
      "Useful for understanding propaganda techniques"
    ]
  },
  {
    sourceType: "Diary/Letter",
    whatToLookFor: [
      "Who wrote it and when?",
      "Who was it written for? Private or public?",
      "What was their position/perspective?",
      "Are they an eyewitness?"
    ],
    limitations: [
      "Personal opinion, may be biased",
      "Limited perspective - only what they saw/knew",
      "May be written with audience in mind",
      "Memory may be faulty"
    ],
    usefulnessFactors: [
      "Personal insight and emotions",
      "May be more honest if private",
      "Eyewitness account if present at events"
    ]
  },
  {
    sourceType: "Government Report/Statistics",
    whatToLookFor: [
      "Who commissioned it and why?",
      "What methods were used?",
      "Is data complete or selective?",
      "What was done with the findings?"
    ],
    limitations: [
      "May be selective in what's included",
      "Government may want certain conclusions",
      "Statistics can be manipulated",
      "Definitions may change over time"
    ],
    usefulnessFactors: [
      "Official data with wide coverage",
      "Shows government awareness of issues",
      "Can track changes over time"
    ]
  },
  {
    sourceType: "Newspaper Article",
    whatToLookFor: [
      "Which newspaper? Political leaning?",
      "Is it news report or opinion piece?",
      "Who is the intended reader?",
      "When was it written - during or after events?"
    ],
    limitations: [
      "Newspapers have political bias",
      "Written to sell papers - may sensationalise",
      "May not have full facts if written quickly",
      "Reflects one perspective"
    ],
    usefulnessFactors: [
      "Contemporary account",
      "Shows public opinion/concerns",
      "Wide coverage of events"
    ]
  },
  {
    sourceType: "Speech",
    whatToLookFor: [
      "Who is speaking and to whom?",
      "What is the occasion/context?",
      "What is the speaker trying to achieve?",
      "How was it recorded/reported?"
    ],
    limitations: [
      "Speaker wants to persuade/impress",
      "May not reflect true beliefs",
      "Only what they chose to say",
      "May be reported inaccurately"
    ],
    usefulnessFactors: [
      "Shows official position/policy",
      "Can reveal intentions and priorities",
      "May influence events"
    ]
  }
];

// ═══════════════════════════════════════════════════════════
// EXAM QUESTION TYPES
// ═══════════════════════════════════════════════════════════

export const historyQuestionTypes = {
  sourceAnalysis: {
    type: "Source Analysis",
    marks: "4-8 marks",
    approach: [
      "Read the question carefully - what are you being asked?",
      "Content: What does the source say/show?",
      "Nature: What type of source is it?",
      "Origin: Who made it, when, where?",
      "Purpose: Why was it created?",
      "Use own knowledge to support/challenge the source"
    ],
    commonQuestions: [
      "How useful is Source A for studying X?",
      "What can you learn from Source A about X?",
      "How do Sources A and B differ in their views of X?"
    ]
  },
  describeQuestions: {
    type: "Describe",
    marks: "4 marks",
    approach: [
      "Give factual information",
      "Include specific details (names, dates, statistics)",
      "Make 2-3 developed points",
      "No analysis needed - just information"
    ],
    starterPhrases: [
      "One feature was...",
      "Another key aspect was...",
      "This involved..."
    ]
  },
  explainQuestions: {
    type: "Explain why/Explain how",
    marks: "8-12 marks",
    approach: [
      "Identify 2-3 reasons/factors",
      "Explain HOW/WHY each factor was important",
      "Use specific evidence to support",
      "Link factors together if possible",
      "Consider different perspectives"
    ],
    structureExample: "PEE: Point → Evidence → Explanation of significance"
  },
  evaluateQuestions: {
    type: "How far do you agree?/Evaluate",
    marks: "16+ marks",
    approach: [
      "Understand the statement being evaluated",
      "Arguments FOR the statement (with evidence)",
      "Arguments AGAINST the statement (with evidence)",
      "Come to a JUDGEMENT - how far do you agree?",
      "Justify your conclusion"
    ],
    planningTip: "Spend 5 mins planning: list points for and against, then decide your argument"
  },
  narrativeAccount: {
    type: "Write a narrative account (AQA)",
    marks: "8 marks",
    approach: [
      "Tell the story in CHRONOLOGICAL order",
      "Include specific details (dates, names, events)",
      "Show how events LINK together (cause and consequence)",
      "Use connectives: 'This led to...', 'As a result...', 'Following this...'",
      "Don't just list events - show connections"
    ],
    example: "Write a narrative account analysing the events leading to the outbreak of WWI in 1914."
  }
};

// ═══════════════════════════════════════════════════════════
// EXPORT ALL HISTORY DATA
// ═══════════════════════════════════════════════════════════

export const allHistoryTopics = [
  germanyTopic,
  elizabethanTopic,
  ww1Topic,
  medicineTopic
];

export function getHistoryTopic(name: string): HistoryTopic | undefined {
  return allHistoryTopics.find(t =>
    t.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function getTimelineForTopic(topicName: string): HistoricalEvent[] {
  const topic = getHistoryTopic(topicName);
  return topic?.timeline || [];
}

export function getKeyFigures(topicName: string): HistoricalPerson[] {
  const topic = getHistoryTopic(topicName);
  return topic?.keyFigures || [];
}

// Quick reference for key dates
export const keyDatesQuickReference = {
  germany: {
    "1918": "Kaiser abdicates, Republic declared",
    "1919": "Treaty of Versailles, Spartacist Uprising",
    "1923": "Hyperinflation, Munich Putsch",
    "1929": "Wall Street Crash",
    "1933": "Hitler Chancellor, Reichstag Fire, Enabling Act",
    "1934": "Night of Long Knives, Hitler becomes Führer",
    "1935": "Nuremberg Laws",
    "1938": "Kristallnacht"
  },
  elizabethan: {
    "1558": "Elizabeth becomes Queen",
    "1559": "Religious Settlement",
    "1568": "Mary QoS arrives in England",
    "1570": "Pope excommunicates Elizabeth",
    "1580": "Drake circumnavigation",
    "1587": "Mary QoS executed",
    "1588": "Spanish Armada"
  },
  wwi: {
    "1914": "Assassination, war begins, Battle of Marne",
    "1915": "Gallipoli, first gas attack",
    "1916": "Somme, Verdun, Jutland",
    "1917": "USA enters, Passchendaele",
    "1918": "Spring Offensive, Armistice",
    "1919": "Treaty of Versailles"
  },
  medicine: {
    "1348": "Black Death",
    "1543": "Vesalius anatomy book",
    "1628": "Harvey blood circulation",
    "1798": "Jenner vaccination",
    "1854": "Snow cholera investigation",
    "1861": "Pasteur germ theory",
    "1928": "Fleming discovers penicillin",
    "1948": "NHS founded"
  }
};
