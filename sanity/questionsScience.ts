export default {
    name: 'questionsScience',
    title: "QuestionsScience",
    type: 'document',
    fields: [
      {
        name: 'question',
        title: "Question",
        type: "string"
      },
      {
        name: 'answers',
        title: "Answers",
        type: 'array',
        of: [{type: 'string'}]
      },
      {
        name: "correctAnswer",
        title: "Correct Answer",
        type: "string"
      }
    ]
  }