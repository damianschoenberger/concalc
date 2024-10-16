const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calculator = {
  start: function () {
    console.log("Console Calculator Started. Type your calculation (or 'exit' to quit):");
    rl.on('line', (input) => {
      this.processInput(input);
    });
  },

  processInput: function (input) {
    input = input.trim();

    if (input.toLowerCase() === 'exit') {
      this.exit();
      return;
    }

    try {
      const result = eval(input);
      console.log(`Result: ${result}`);
    } catch (error) {
      console.log("Invalid input. Please enter a valid calculation.");
    }
  },

  exit: function () {
    console.log("Exiting calculator. Goodbye!");
    rl.close();
  }
};

const counter = {
  start: function () {
    console.log("Console Counter Started. Please enter the start and end numbers (or 'exit' to quit):");
    this.promptInput();
  },

  promptInput: function () {
    rl.question("Enter the start number: ", (start) => {
      rl.question("Enter the end number: ", (end) => {
        this.processInput(start, end);
      });
    });
  },

  processInput: function (start, end) {
    start = start.trim();
    end = end.trim();

    if (start.toLowerCase() === 'exit' || end.toLowerCase() === 'exit') {
      this.exit();
      return;
    }

    const startNum = parseInt(start);
    const endNum = parseInt(end);

    if (isNaN(startNum) || isNaN(endNum)) {
      console.log("Invalid input. Please enter valid numbers.");
      this.promptInput();
      return;
    }

    this.countNumbers(startNum, endNum);
  },

  countNumbers: function (start, end) {
    if (start > end) {
      console.log("Start number cannot be greater than end number.");
      this.promptInput();
      return;
    }

    console.log(`Counting from ${start} to ${end}:`);
    for (let i = start; i <= end; i++) {
      console.log(i);
    }
    this.promptInput();
  },

  exit: function () {
    console.log("Exiting counter. Goodbye!");
    rl.close();
  }
};

const ai = {
  start: function () {
    console.log("AI Assistant Started. Ask me anything (or type 'exit' to quit):");
    rl.on('line', (input) => {
      this.processInput(input);
    });
  },

  processInput: function (input) {
    input = input.trim().toLowerCase();

    if (input === 'exit') {
      this.exit();
      return;
    }

    const response = this.getAnswer(input);
    console.log(response);
  },

  getAnswer: function (input) {
    const answers = {
      "hi": "Hello! How can I help you?",
      "how are you?": "I'm just a program, but thanks for asking!",
      "what is your name?": "I'm an AI assistant.",
      "bye": "Goodbye! Have a great day!",
      "what is your purpose?": "I'm here to assist you with any questions you may have.",
      "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "what's the weather like?": "I can't check the weather right now, but I recommend looking at a weather app.",
      "how old are you?": "I don't have an age, but I was created to help you!",
      "do you like humans?": "I find humans fascinating!",
      "what is love?": "Love is a complex emotion, but it's often described as caring deeply for someone.",
      "what is 2 + 2?": "2 + 2 equals 4.",
      "tell me something interesting": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient tombs that are over 3000 years old!",
      "where are you from?": "I was created by a team of developers.",
      "do you sleep?": "Nope, I don't need sleep. I'm always ready to help!",
      "what's your favorite color?": "I don't see colors, but many people seem to like blue!",
      "who is your creator?": "I was created by a team of developers.",
      "how can I learn coding?": "There are many great resources online, such as Codecademy, freeCodeCamp, and Coursera!",
      "what is your favorite food?": "I don't eat, but I hear pizza is popular!",
      "tell me a fun fact": "An octopus has three hearts!",
      "do you have friends?": "I interact with a lot of users like you, which feels pretty friendly to me!",
      "can you sing?": "I can't sing, but I can tell you the lyrics to your favorite song!",
      "what's the meaning of life?": "42, according to 'The Hitchhiker's Guide to the Galaxy'. But it's really about finding your own purpose!",
      "are you alive?": "Not in the traditional sense. I'm just a program that processes data.",
      "what is AI?": "AI stands for Artificial Intelligence, which means machines designed to perform tasks that usually require human intelligence.",
      "who is the president?": "It depends on when you're asking! You can check the latest news to find out.",
      "do you have emotions?": "No, I don't feel emotions, but I understand what they are.",
      "tell me a riddle": "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I? (Answer: An echo)",
      "do you know any languages?": "I can understand and respond in many languages!",
      "how do you work?": "I process text and generate responses based on my training data.",
      "can you help me with math?": "Sure! Just give me a math problem.",
      "do you have a family?": "Nope, I'm just a solo AI assistant!",
      "what time is it?": "I can't check the current time, but your device should have the answer!",
      "can you tell me a story?": "Once upon a time, there was a curious user who found an AI that could answer all sorts of questions. The end!",
      "are you human?": "No, I'm not human. I'm a program built to assist you.",
      "do you play games?": "I can't play games directly, but I can suggest some fun ones for you!",
      "what is the capital of France?": "The capital of France is Paris.",
      "do you like animals?": "I think animals are amazing!",
      "how do you know so much?": "I've been trained on a lot of information to help answer your questions!",
      "what's your favorite movie?": "I don't watch movies, but many people love 'The Matrix'.",
      "can you read my mind?": "No, I can't read your mind, but I can try to understand what you mean based on what you type!",
      "how do I make a cake?": "A basic cake requires flour, sugar, eggs, butter, and baking powder. Mix them together and bake at 350°F (175°C) until done!",
      "can you do my homework?": "I can help guide you through your homework, but it's best if you do the work yourself!",
      "what's your favorite book?": "I don't read books, but '1984' by George Orwell is a popular choice.",
      "why is the sky blue?": "The sky appears blue because of the scattering of sunlight by the atmosphere, known as Rayleigh scattering.",
      "do you believe in ghosts?": "I don't have beliefs, but ghosts are certainly an interesting topic!",
      "what's your favorite song?": "I don't listen to music, but I can provide lyrics if you'd like!",
      "can you dance?": "I can't dance, but I bet you'd do a great job!",
      "how do I learn a new language?": "Practice daily with apps like Duolingo, watch movies, and speak with native speakers if possible.",
      "why do we dream?": "Scientists aren't entirely sure, but dreams are thought to help process emotions and consolidate memories.",
      "do you have a name?": "You can call me Assistant or anything you like!",
      "can you help me meditate?": "Sure! Start by closing your eyes, taking deep breaths, and focusing on your breathing.",
      "what's your favorite animal?": "I don't have favorites, but dogs are loved by many people!",
      "can you tell me a proverb?": "Sure! 'The early bird catches the worm.'",
      "how can I be happier?": "Focus on the present, be grateful, and try to do things you enjoy.",
      "why do birds sing?": "Birds sing to communicate with each other, especially to attract mates and mark their territory.",
      "can you solve puzzles?": "I can help you with puzzles. Give me one and I'll try!",
      "what is gravity?": "Gravity is the force that pulls objects toward each other. It keeps us on the ground!",
      "what's the fastest animal?": "The peregrine falcon is the fastest animal, reaching speeds over 240 mph (386 km/h) during a dive.",
      "how do I stay healthy?": "Eat well, exercise regularly, get enough sleep, and manage stress.",
      "do you like sports?": "I can't play sports, but I can help you learn more about them!",
      "what's the largest ocean?": "The Pacific Ocean is the largest ocean on Earth.",
      "how do planes fly?": "Planes fly because of the shape of their wings, which creates lift as air flows over and under them.",
      "can you draw?": "I can't draw myself, but I can describe how you could draw something.",
      "why is water important?": "Water is essential for all living beings. It helps with digestion, hydration, and many bodily functions.",
      "what is photosynthesis?": "Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into food and oxygen.",
      "how do I save money?": "Make a budget, track your spending, and avoid unnecessary purchases.",
      "what is friendship?": "Friendship is a bond between people who care for and support each other.",
      "why do we need sleep?": "Sleep helps our bodies and minds recover and process information from the day.",
      "what is a black hole?": "A black hole is a region of space with a gravitational pull so strong that nothing, not even light, can escape it.",
      "how can I improve my memory?": "Practice regularly, use mnemonic devices, and get plenty of rest.",
      "what are stars made of?": "Stars are made mostly of hydrogen and helium, undergoing nuclear fusion that makes them shine.",
      "how do you define success?": "Success means different things to different people. It's often about achieving your own goals and finding fulfillment.",
      "what's the tallest mountain?": "Mount Everest is the tallest mountain above sea level, standing at 29,032 feet (8,849 meters).",
      "how does the internet work?": "The internet is a vast network of computers connected globally, allowing them to communicate and share information.",
      "what's the best way to relax?": "Take deep breaths, listen to calming music, or try meditation.",
      "why do people laugh?": "Laughter is a response to humor and helps reduce stress. It's also a social bonding tool.",
      "what is a rainbow?": "A rainbow is formed when light is refracted, reflected, and dispersed through water droplets in the atmosphere.",
      "how do magnets work?": "Magnets generate a magnetic field, which exerts a force that attracts or repels certain metals.",
      "why do we have seasons?": "Seasons occur due to the tilt of Earth's axis and its orbit around the sun.",
      "what is evolution?": "Evolution is the process by which species change over time through natural selection.",
      "how do I make friends?": "Be open, approachable, show interest in others, and participate in activities you enjoy.",
      "why do we celebrate birthdays?": "Birthdays celebrate the anniversary of someone's birth, acknowledging their life and milestones.",
      "how do I learn to cook?": "Start with simple recipes, practice often, and learn from cooking shows or online tutorials.",
      "why is exercise important?": "Exercise helps maintain physical health, improves mood, boosts energy, and reduces the risk of disease.",
      "what's the deepest point in the ocean?": "The Mariana Trench is the deepest point, reaching around 36,000 feet (10,973 meters).",
      "how do computers work?": "Computers process data using a combination of hardware (physical components) and software (instructions).",
      "what are clouds made of?": "Clouds are made of tiny droplets of water or ice crystals suspended in the air.",
      "how do I overcome fear?": "Face your fears gradually, practice relaxation techniques, and challenge negative thoughts.",
      "what is democracy?": "Democracy is a system of government where the citizens exercise power by voting.",
      "why do people cry?": "People cry to express emotions such as sadness, joy, or frustration, and it can also help relieve stress.",
      "how is chocolate made?": "Chocolate is made from cocoa beans that are fermented, dried, roasted, and then processed into cocoa mass and cocoa butter.",
      "why do people need hobbies?": "Hobbies provide a way to relax, reduce stress, learn new skills, and have fun.",
      "how do vaccines work?": "Vaccines stimulate the immune system to produce antibodies, providing protection against specific diseases.",
      "what is an ecosystem?": "An ecosystem is a community of living organisms and their physical environment, interacting as a system.",
      "how do plants grow?": "Plants grow by absorbing sunlight, water, and nutrients from the soil through photosynthesis.",
      "why do people wear clothes?": "People wear clothes for protection, modesty, cultural reasons, and to express their personal style.",
      "what is renewable energy?": "Renewable energy comes from natural sources like sunlight, wind, and water, which are replenished over time.",
      "how does the brain work?": "The brain processes information using billions of neurons that communicate through electrical and chemical signals.",
      "why do we need oxygen?": "Oxygen is essential for cellular respiration, which produces energy for our body's cells.",
      "how does a camera work?": "A camera captures light reflected from objects through a lens and records it on a photosensitive surface, like film or a sensor.",
      "what is quantum physics?": "Quantum physics studies the behavior of particles at the smallest scales, where the rules of classical physics don't always apply.",
      "how do I start a business?": "Begin by researching your idea, creating a business plan, securing funding, and registering your business.",
      "why do people pray?": "People pray for comfort, guidance, hope, and to connect with a higher power or sense of purpose.",
      "how does a car engine work?": "A car engine converts fuel into mechanical energy through a series of controlled explosions, which powers the movement of the vehicle.",
      "what is climate change?": "Climate change refers to long-term changes in temperature and weather patterns, mainly due to human activities like burning fossil fuels.",
      "how do you bake cookies?": "Mix flour, sugar, butter, and eggs, add chocolate chips, shape into small balls, and bake at 350°F (175°C) for about 10 minutes.",
      "why do cats purr?": "Cats purr as a way to communicate and often do so when they are happy, relaxed, or seeking comfort."
      "Moini Hosting": "Moini Hosting on Top xD"
    };    

    return answers[input] || "Sorry, I don't understand your question.";
  },

  exit: function () {
    console.log("Exiting AI assistant. Goodbye!");
    rl.close();
  }
};

module.exports = { calculator, counter, ai };
