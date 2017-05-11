class DebugHelper {

   getArrayOfWords() {
      return 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'.split(' ');
   }


   get finalResults() {
      return [
         {
            player: 'Rose',
            score: 500,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords()
         },
         {
            player: 'Miles',
            score: 400,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords()
         },
         {
            player: 'Tam',
            score: 300,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords()
         },
         {
            player: 'Brian',
            score: 200,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords()
         }
      ]
   }


}

export default new DebugHelper();