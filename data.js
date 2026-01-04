// Educational content data
const chaptersData = [
    {
        id: 1,
        title: "Introduction to Programming",
        content: {
            visual: `
                <h3>What is Programming?</h3>
                <p>Programming is the process of creating instructions for computers to follow. Think of it like giving directions on a map - you need to be precise and clear!</p>
                <div class="visual-content">
                    <h4>📊 Visual Concept Map</h4>
                    <p><strong>Programmer → Code → Computer → Output</strong></p>
                    <p>Just like an architect draws blueprints, a programmer writes code that tells the computer what to do.</p>
                    <p>📈 Common programming languages include:</p>
                    <ul>
                        <li>JavaScript (for websites)</li>
                        <li>Python (versatile and beginner-friendly)</li>
                        <li>Java (for applications)</li>
                        <li>C++ (for system programming)</li>
                    </ul>
                </div>
                <h3>Key Concepts</h3>
                <p><strong>Variables:</strong> Containers that store data. Imagine labeled boxes where you put different items.</p>
                <p><strong>Functions:</strong> Reusable blocks of code. Like recipes that you can use repeatedly.</p>
                <p><strong>Loops:</strong> Code that repeats. Like doing the same exercise multiple times in a workout.</p>
            `,
            auditory: `
                <h3>What is Programming?</h3>
                <p>Programming is like having a conversation with a computer. You give it instructions, and it follows them precisely.</p>
                <div class="auditory-content">
                    <h4>🎵 Learning Through Discussion</h4>
                    <p>Think of programming as a language - just as you learn to speak a foreign language, you learn to "speak" to computers.</p>
                    <p>Listen to these concepts explained:</p>
                    <ul>
                        <li><strong>Variables:</strong> These are like names you call things. When you say "myAge" the computer knows you're talking about a number representing age.</li>
                        <li><strong>Functions:</strong> These are like commands. When you say "calculateTotal()" the computer knows to perform a calculation.</li>
                        <li><strong>Loops:</strong> These are like repeating a song chorus - you tell the computer "do this 10 times" and it repeats the action.</li>
                    </ul>
                    <p>🎧 <strong>Key Takeaway:</strong> Programming languages are designed to be readable and logical, making it easier for humans to communicate with machines.</p>
                </div>
                <h3>Common Programming Languages</h3>
                <p>Different languages serve different purposes, just like different instruments create different sounds in an orchestra. JavaScript powers websites, Python is great for beginners and data science, Java builds applications, and C++ handles system-level programming.</p>
            `,
            kinesthetic: `
                <h3>What is Programming?</h3>
                <p>Programming is hands-on problem-solving. You build things step by step, just like constructing with building blocks!</p>
                <div class="kinesthetic-content">
                    <h4>🔨 Hands-On Learning</h4>
                    <p><strong>Try this exercise:</strong> Write down the steps to make a sandwich. Notice how detailed you need to be? That's programming!</p>
                    <p><strong>Practical Examples:</strong></p>
                    <ol>
                        <li><strong>Variables:</strong> Create a mental box labeled "age" and put the number 25 in it. That's a variable storing a value!</li>
                        <li><strong>Functions:</strong> Think of a function as a recipe. The recipe (function) tells you exactly what steps to follow to bake a cake.</li>
                        <li><strong>Loops:</strong> Imagine doing 10 push-ups. You repeat the same action multiple times - that's what a loop does in code!</li>
                    </ol>
                    <p>🛠️ <strong>Activity:</strong> Try writing pseudocode (plain English steps) for everyday tasks like "brushing teeth" or "making coffee". Notice how breaking things into steps is the essence of programming!</p>
                </div>
                <h3>Why Learn Programming?</h3>
                <p>Programming empowers you to create. You can build websites, automate tasks, analyze data, create games, and solve real-world problems. Every program you write is a tool you've created with your own hands (well, keyboard)!</p>
            `
        }
    },
    {
        id: 2,
        title: "Data Structures and Algorithms",
        content: {
            visual: `
                <h3>Understanding Data Structures</h3>
                <p>Data structures are ways of organizing and storing data efficiently. Think of them as different types of containers, each optimized for specific tasks.</p>
                <div class="visual-content">
                    <h4>📊 Visual Comparison</h4>
                    <p><strong>Arrays:</strong> Like a row of lockers - each has a numbered position (index).</p>
                    <pre>Index: [0] [1] [2] [3]
Data:  [A] [B] [C] [D]</pre>
                    <p><strong>Linked Lists:</strong> Like a treasure hunt - each item points to the next location.</p>
                    <p><strong>A → B → C → D → null</strong></p>
                    <p><strong>Stacks:</strong> Like a stack of plates - Last In, First Out (LIFO).</p>
                    <p><strong>Queues:</strong> Like a line at a store - First In, First Out (FIFO).</p>
                </div>
                <h3>Algorithms</h3>
                <p>Algorithms are step-by-step procedures for solving problems. Visualize algorithms as flowcharts that show decision paths.</p>
                <div class="visual-content">
                    <h4>📈 Algorithm Visualization</h4>
                    <p><strong>Search Algorithm:</strong></p>
                    <p>Start → Check item → Match? → Yes: Found | No: Check next → Continue</p>
                    <p><strong>Sort Algorithm:</strong></p>
                    <p>Start → Compare items → Swap if needed → Repeat until sorted</p>
                </div>
            `,
            auditory: `
                <h3>Understanding Data Structures</h3>
                <p>Data structures are organizational methods for information. Let's discuss how each one works!</p>
                <div class="auditory-content">
                    <h4>🎵 Learning Through Explanation</h4>
                    <p><strong>Arrays:</strong> Think of an array like a numbered list you read aloud. "Item one, item two, item three..." Each position has a number you can call out.</p>
                    <p><strong>Linked Lists:</strong> Imagine a story where each sentence tells you where to find the next sentence. The information is connected in a chain.</p>
                    <p><strong>Stacks:</strong> Picture a conversation where you can only respond to the last thing said. Last thing you said goes on top, and you remove from the top first.</p>
                    <p><strong>Queues:</strong> Think of taking turns speaking. The first person to raise their hand speaks first, and everyone waits their turn in order.</p>
                </div>
                <h3>Algorithms</h3>
                <p>Algorithms are systematic approaches to problem-solving. Let's talk through how algorithms work:</p>
                <div class="auditory-content">
                    <h4>🎧 Algorithm Discussion</h4>
                    <p><strong>Search Algorithm:</strong> "If I'm looking for a book, I check the first shelf. Is it there? No. Then I check the next shelf, and the next, until I find it or check them all."</p>
                    <p><strong>Sort Algorithm:</strong> "To organize books alphabetically, I compare two titles. If they're out of order, I swap them. I repeat this process until everything is in order."</p>
                    <p>🎯 <strong>Key Insight:</strong> Algorithms are like recipes for problem-solving - follow the steps, and you'll get the right result!</p>
                </div>
            `,
            kinesthetic: `
                <h3>Understanding Data Structures</h3>
                <p>Data structures are physical ways to organize information. Let's experience them hands-on!</p>
                <div class="kinesthetic-content">
                    <h4>🔨 Hands-On Practice</h4>
                    <p><strong>Arrays Activity:</strong> Line up 5 objects (books, cups, etc.) in a row. Number them 0, 1, 2, 3, 4. To access item 2, count and pick up the third object. That's array indexing!</p>
                    <p><strong>Linked Lists Activity:</strong> Write notes on separate cards. Each card says "go to card #X" to find the next piece of information. This creates a chain you follow physically.</p>
                    <p><strong>Stacks Activity:</strong> Stack plates one on top of another. You can only add or remove from the top. Try removing the bottom plate without touching the others - impossible! That's LIFO (Last In, First Out).</p>
                    <p><strong>Queues Activity:</strong> Form a line. The first person joins first, and leaves first. New people join at the end. That's FIFO (First In, First Out) in action!</p>
                </div>
                <h3>Algorithms</h3>
                <p>Practice algorithms by physically doing them!</p>
                <div class="kinesthetic-content">
                    <h4>🛠️ Algorithm Practice</h4>
                    <p><strong>Search Activity:</strong> Hide an object. Start searching systematically - check under the first chair, then the second, then the third. This is a linear search algorithm!</p>
                    <p><strong>Sort Activity:</strong> Take 5 playing cards with random numbers. Compare two cards, swap if the larger is before the smaller. Repeat until all cards are in order. You just performed a bubble sort!</p>
                    <p>💪 <strong>Remember:</strong> The best way to understand algorithms is to actually perform them yourself!</p>
                </div>
            `
        }
    },
    {
        id: 3,
        title: "Object-Oriented Programming",
        content: {
            visual: `
                <h3>OOP Fundamentals</h3>
                <p>Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects" that contain data and code.</p>
                <div class="visual-content">
                    <h4>📊 Visual Model</h4>
                    <p><strong>Class (Blueprint):</strong></p>
                    <pre>┌─────────────────────┐
│      Car (Class)    │
├─────────────────────┤
│ Properties:         │
│  - color            │
│  - brand            │
│  - speed            │
├─────────────────────┤
│ Methods:            │
│  - start()          │
│  - accelerate()     │
│  - brake()          │
└─────────────────────┘</pre>
                    <p><strong>Object (Instance):</strong> An actual car created from the blueprint</p>
                    <p>Car1: red Toyota, speed 60</p>
                    <p>Car2: blue Honda, speed 45</p>
                </div>
                <h3>Core Principles</h3>
                <div class="visual-content">
                    <h4>📈 The Four Pillars</h4>
                    <p><strong>Encapsulation:</strong> Data and methods wrapped together in a class (like a capsule).</p>
                    <p><strong>Inheritance:</strong> Child classes inherit from parent classes (like a family tree).</p>
                    <p><strong>Polymorphism:</strong> One interface, many forms (like different shapes drawing differently).</p>
                    <p><strong>Abstraction:</strong> Hide complexity, show only what's needed (like a car's dashboard).</p>
                </div>
            `,
            auditory: `
                <h3>OOP Fundamentals</h3>
                <p>Object-Oriented Programming organizes code around objects - think of them as nouns that have properties and can perform actions.</p>
                <div class="auditory-content">
                    <h4>🎵 Learning Through Discussion</h4>
                    <p><strong>Class vs Object:</strong> A class is like a recipe. When you say "I want to make a cake," the recipe is the class. When you actually bake the cake, that cake is an object (an instance of the recipe).</p>
                    <p>Think of a "Car" class. The class describes what all cars have: color, brand, speed. But when you say "my red Toyota going 60 mph," you're talking about a specific object - an instance of the Car class.</p>
                    <p>🎧 <strong>Listen to this:</strong> Classes are templates. Objects are specific examples created from those templates.</p>
                </div>
                <h3>Core Principles</h3>
                <div class="auditory-content">
                    <h4>🎧 The Four Pillars Explained</h4>
                    <p><strong>Encapsulation:</strong> This means keeping related things together. Like keeping your car's engine, fuel, and controls all in one package. You interact with the car as a whole unit, not individual parts.</p>
                    <p><strong>Inheritance:</strong> This is like saying "a Toyota is a type of Car, so it gets all the Car features, plus some Toyota-specific ones." Child classes inherit from parent classes.</p>
                    <p><strong>Polymorphism:</strong> This means "many forms." Like how different animals make sounds differently - a dog barks, a cat meows, but both "makeSound()". Same method name, different behavior.</p>
                    <p><strong>Abstraction:</strong> This is about simplicity. You don't need to know how an engine works to drive a car - you just need to know about the steering wheel, pedals, and gears. Hide the complexity!</p>
                </div>
            `,
            kinesthetic: `
                <h3>OOP Fundamentals</h3>
                <p>Object-Oriented Programming is about creating and using objects in a structured way. Let's build understanding through practice!</p>
                <div class="kinesthetic-content">
                    <h4>🔨 Hands-On Learning</h4>
                    <p><strong>Class and Object Activity:</strong></p>
                    <ol>
                        <li>Create a "Book" class blueprint: Write down that a book has title, author, and pages.</li>
                        <li>Create objects: Take three actual books. Label each: Book1 has title "1984", author "Orwell", 328 pages. Book2 has different values. You just created instances!</li>
                        <li>Practice: Create a "Person" class mentally - properties might be name, age, height. Then think of yourself as an object with specific values for those properties.</li>
                    </ol>
                    <p>🛠️ <strong>Try this:</strong> Design a "Smartphone" class. What properties does it have? (brand, model, battery). What actions can it do? (call, text, play music). Now imagine different smartphone objects!</p>
                </div>
                <h3>Core Principles</h3>
                <div class="kinesthetic-content">
                    <h4>🛠️ Practice the Principles</h4>
                    <p><strong>Encapsulation Activity:</strong> Put related items in a box (like all your school supplies in a pencil case). The pencil case "encapsulates" your supplies - they're kept together as one unit!</p>
                    <p><strong>Inheritance Activity:</strong> Start with a general "Vehicle" class. Then create a "Bicycle" that inherits vehicle properties but adds pedals. Then create a "Car" that inherits vehicle properties but adds an engine. Practice building the hierarchy!</p>
                    <p><strong>Polymorphism Activity:</strong> Different shapes have a "draw()" method. Draw a circle, then draw a square, then draw a triangle. Same action name (draw), different results. Try this physically!</p>
                    <p><strong>Abstraction Activity:</strong> Use a remote control. You press buttons without knowing the internal electronics. The remote "abstracts" away the complexity. Try using different devices this way!</p>
                </div>
            `
        }
    }
];

// Test questions for each chapter
const testsData = {
    1: [
        {
            id: 1,
            type: "multiple-choice",
            question: "What is a variable in programming?",
            options: [
                "A container that stores data",
                "A type of loop",
                "A function name",
                "An error message"
            ],
            correct: 0
        },
        {
            id: 2,
            type: "true-false",
            question: "Programming is the process of creating instructions for computers.",
            correct: true
        },
        {
            id: 3,
            type: "multiple-choice",
            question: "Which of the following is a programming language?",
            options: [
                "JavaScript",
                "HTML",
                "CSS",
                "All of the above"
            ],
            correct: 0
        },
        {
            id: 4,
            type: "fill-blank",
            question: "A _______ is a reusable block of code that performs a specific task.",
            correct: "function"
        },
        {
            id: 5,
            type: "true-false",
            question: "Loops allow code to repeat multiple times.",
            correct: true
        },
        {
            id: 6,
            type: "multiple-choice",
            question: "What does a function do?",
            options: [
                "Stores data",
                "Repeats code automatically",
                "Groups code into reusable blocks",
                "Displays output only"
            ],
            correct: 2
        },
        {
            id: 7,
            type: "fill-blank",
            question: "A _______ stores a value that can change during program execution.",
            correct: "variable"
        }
    ],
    2: [
        {
            id: 1,
            type: "multiple-choice",
            question: "What is a data structure?",
            options: [
                "A way to organize and store data",
                "A type of algorithm",
                "A programming language",
                "A database system"
            ],
            correct: 0
        },
        {
            id: 2,
            type: "true-false",
            question: "An array uses indexed positions to store data.",
            correct: true
        },
        {
            id: 3,
            type: "multiple-choice",
            question: "What does LIFO stand for in stacks?",
            options: [
                "Last In, First Out",
                "Last In, Last Out",
                "First In, First Out",
                "First In, Last Out"
            ],
            correct: 0
        },
        {
            id: 4,
            type: "fill-blank",
            question: "A _______ is a data structure that follows First In, First Out principle.",
            correct: "queue"
        },
        {
            id: 5,
            type: "true-false",
            question: "Algorithms are step-by-step procedures for solving problems.",
            correct: true
        },
        {
            id: 6,
            type: "multiple-choice",
            question: "Which data structure is like a treasure hunt where each item points to the next?",
            options: [
                "Array",
                "Linked List",
                "Stack",
                "Queue"
            ],
            correct: 1
        },
        {
            id: 7,
            type: "fill-blank",
            question: "An _______ is a step-by-step procedure for solving a problem.",
            correct: "algorithm"
        }
    ],
    3: [
        {
            id: 1,
            type: "multiple-choice",
            question: "What is a class in OOP?",
            options: [
                "A blueprint for creating objects",
                "A specific object instance",
                "A function",
                "A variable"
            ],
            correct: 0
        },
        {
            id: 2,
            type: "true-false",
            question: "An object is an instance of a class.",
            correct: true
        },
        {
            id: 3,
            type: "multiple-choice",
            question: "Which OOP principle means keeping data and methods together?",
            options: [
                "Inheritance",
                "Polymorphism",
                "Encapsulation",
                "Abstraction"
            ],
            correct: 2
        },
        {
            id: 4,
            type: "fill-blank",
            question: "_______ allows child classes to inherit properties and methods from parent classes.",
            correct: "inheritance"
        },
        {
            id: 5,
            type: "true-false",
            question: "Polymorphism means one interface with many forms.",
            correct: true
        },
        {
            id: 6,
            type: "multiple-choice",
            question: "Which principle hides complexity and shows only what's needed?",
            options: [
                "Encapsulation",
                "Inheritance",
                "Polymorphism",
                "Abstraction"
            ],
            correct: 3
        },
        {
            id: 7,
            type: "fill-blank",
            question: "_______ means one method name can have different implementations.",
            correct: "polymorphism"
        }
    ]
};

