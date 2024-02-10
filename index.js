const readline = require('readline');

class CBTExam {
  constructor() {
    this.questions = {
      HRM: [
        {
          question: 'What is the primary goal of Human Resource Management?',
          options: [
            'Profit maximization',
            'Employee satisfaction',
            'Cost minimization',
            'Customer retention',
          ],
          correct_answer: 'Employee satisfaction',
        },
        {
          question:
            'Which HRM function is responsible for recruiting new employees?',
          options: [
            'Training and development',
            'Compensation and benefits',
            'Staffing',
            'Employee relations',
          ],
          correct_answer: 'Staffing',
        },
      
      ],
      PM: [
        {
          question: 'What is a project milestone?',
          options: [
            'End of the project',
            'Significant point in project timeline',
            'Project budget',
            'Project team members',
          ],
          correct_answer: 'Significant point in project timeline',
        },
        {
          question: 'What is the critical path in project management?',
          options: [
            'Shortest path in a project',
            'Longest path in a project',
            'Path with most activities',
            'Path with least activities',
          ],
          correct_answer: 'Longest path in a project',
        },
       
      ],
      HSE: [
        {
          question: 'What does PPE stand for in Health Safety and Environment?',
          options: [
            'Personal Protective Equipment',
            'Pollution Prevention and Elimination',
            'Health and Safety Evaluation',
            'Public Protection Environment',
          ],
          correct_answer: 'Personal Protective Equipment',
        },
        {
          question: 'What is the purpose of an emergency evacuation plan?',
          options: [
            'To create panic',
            'To ensure daily activities are not interrupted',
            'To safeguard people during emergencies',
            'To test fire alarms',
          ],
          correct_answer: 'To safeguard people during emergencies',
        },
       
      ],
      CRM: [
        {
          question:
            'What is the main goal of Customer Relationship Management?',
          options: [
            'Increase company expenses',
            'Maximize short-term profits',
            'Build and maintain customer relationships',
            'Minimize customer interactions',
          ],
          correct_answer: 'Build and maintain customer relationships',
        },
        {
          question: 'What is the role of CRM in sales?',
          options: [
            'To ignore customer feedback',
            'To increase customer complaints',
            'To improve customer satisfaction',
            'To reduce customer engagement',
          ],
          correct_answer: 'To improve customer satisfaction',
        },
       
      ],
    };
  }

  generateQuestion(subject) {
    return this.questions[subject][
      Math.floor(Math.random() * this.questions[subject].length)
    ];
  }

  async runExam() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let totalScore = 0;

    for (const subject in this.questions) {
      console.log(`\n----- ${subject} -----`);
      for (let i = 0; i < 5; i++) {
        const questionData = this.generateQuestion(subject);
        console.log(`\n${i + 1}. ${questionData.question}`);

        questionData.options.forEach((option, index) => {
          console.log(`   ${String.fromCharCode(65 + index)}. ${option}`);
        });

        const userAnswer = await this.questionAsync(
          rl,
          'Your answer (A, B, C, or D): '
        );
        const correctAnswerIndex = questionData.options.indexOf(
          questionData.correct_answer
        );

        if (
          userAnswer.toUpperCase() ===
          String.fromCharCode(65 + correctAnswerIndex)
        ) {
          console.log('Correct!\n');
          totalScore++;
        } else {
          console.log(
            `Wrong! Correct answer: ${questionData.correct_answer}\n`
          );
        }
      }
    }

    console.log(`\n----- Exam Summary -----`);
    console.log(`Total Score: ${totalScore}/20`);

    rl.close();
  }

  questionAsync(rl, query) {
    return new Promise((resolve) =>
      rl.question(query, (answer) => resolve(answer))
    );
  }
}

const exam = new CBTExam();
exam.runExam();
