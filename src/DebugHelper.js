class DebugHelper {

   getArrayOfWords() {
      //return some text, shuffled and cut down to a random length of words, so I can test different lengths of strings
      return _.shuffle('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'.split(' ')).slice(0, _.random(2, 20));
   }


   get finalResults() {
      return [
         {
            player: 'Rose',
            score: 500,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords(),
            invalidWords: this.getArrayOfWords()
         },
         {
            player: 'Miles',
            score: 400,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords(),
            invalidWords: this.getArrayOfWords()
         },
         {
            player: 'Tam',
            score: 300,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords(),
            invalidWords: this.getArrayOfWords()
         },
         {
            player: 'Brian',
            score: 200,
            scoredWords: this.getArrayOfWords(),
            sharedWords: this.getArrayOfWords(),
            invalidWords: this.getArrayOfWords()
         }
      ]
   }

   get board1() {
      return {"rows":[{"id":"1","cells":[{"id":"2","text":"E"},{"id":"3","text":"V"},{"id":"4","text":"QU"},{"id":"5","text":"C"}]},{"id":"6","cells":[{"id":"7","text":"T"},{"id":"8","text":"K"},{"id":"9","text":"V"},{"id":"10","text":"T"}]},{"id":"11","cells":[{"id":"12","text":"N"},{"id":"13","text":"E"},{"id":"14","text":"L"},{"id":"15","text":"E"}]},{"id":"16","cells":[{"id":"17","text":"E"},{"id":"18","text":"B"},{"id":"19","text":"E"},{"id":"20","text":"T"}]}]};
   }

   get solutionToBoard1() {
      return [{"word":"ETEN","sequence":[0,4,9,8]},{"word":"EKE","sequence":[0,5,9]},{"word":"VET","sequence":[1,0,4]},{"word":"TEN","sequence":[4,9,8]},{"word":"TENE","sequence":[4,9,8,12]},{"word":"TEL","sequence":[4,9,10]},{"word":"TELT","sequence":[4,9,10,7]},{"word":"TELE","sequence":[4,9,10,11]},{"word":"TEE","sequence":[4,9,12]},{"word":"TEEN","sequence":[4,9,12,8]},{"word":"TEEL","sequence":[4,9,14,10]},{"word":"KET","sequence":[5,0,4]},{"word":"KETE","sequence":[5,0,4,9]},{"word":"KETENE","sequence":[5,0,4,9,8,12]},{"word":"KNELT","sequence":[5,8,9,10,7]},{"word":"KNEE","sequence":[5,8,9,12]},{"word":"KNEEL","sequence":[5,8,9,14,10]},{"word":"KEVEL","sequence":[5,9,6,11,10]},{"word":"KEN","sequence":[5,9,8]},{"word":"KENT","sequence":[5,9,8,4]},{"word":"KENTE","sequence":[5,9,8,4,0]},{"word":"KELT","sequence":[5,9,10,7]},{"word":"KEEN","sequence":[5,9,12,8]},{"word":"KEB","sequence":[5,9,13]},{"word":"KEBELE","sequence":[5,9,13,14,10,11]},{"word":"KEEL","sequence":[5,9,14,10]},{"word":"KEET","sequence":[5,9,14,15]},{"word":"VENT","sequence":[6,9,8,4]},{"word":"VELE","sequence":[6,9,10,11]},{"word":"VEE","sequence":[6,9,12]},{"word":"TET","sequence":[7,11,15]},{"word":"TETE","sequence":[7,11,15,14]},{"word":"NET","sequence":[8,9,4]},{"word":"NETE","sequence":[8,9,4,0]},{"word":"NEK","sequence":[8,9,5]},{"word":"NEVE","sequence":[8,9,6,11]},{"word":"NEVEL","sequence":[8,9,6,11,10]},{"word":"NEE","sequence":[8,9,12]},{"word":"NEB","sequence":[8,9,13]},{"word":"NEBEL","sequence":[8,9,13,14,10]},{"word":"NEELE","sequence":[8,9,14,10,11]},{"word":"NEBEK","sequence":[8,12,13,9,5]},{"word":"EVE","sequence":[9,6,11]},{"word":"EVET","sequence":[9,6,11,7]},{"word":"ENE","sequence":[9,8,12]},{"word":"ELK","sequence":[9,10,5]},{"word":"ELT","sequence":[9,10,7]},{"word":"EEN","sequence":[9,12,8]},{"word":"EEL","sequence":[9,14,10]},{"word":"LET","sequence":[10,9,4]},{"word":"LEK","sequence":[10,9,5]},{"word":"LEKE","sequence":[10,9,5,0]},{"word":"LEV","sequence":[10,9,6]},{"word":"LEVE","sequence":[10,9,6,11]},{"word":"LEVEE","sequence":[10,9,6,11,14]},{"word":"LENT","sequence":[10,9,8,4]},{"word":"LEE","sequence":[10,9,12]},{"word":"LEBEN","sequence":[10,9,13,12,8]},{"word":"LEET","sequence":[10,9,14,15]},{"word":"LEEK","sequence":[10,14,9,5]},{"word":"EVEN","sequence":[11,6,9,8]},{"word":"EVENT","sequence":[11,6,9,8,4]},{"word":"EEK","sequence":[12,9,5]},{"word":"BET","sequence":[13,9,4]},{"word":"BETE","sequence":[13,9,4,0]},{"word":"BEVEL","sequence":[13,9,6,11,10]},{"word":"BEN","sequence":[13,9,8]},{"word":"BENT","sequence":[13,9,8,4]},{"word":"BENE","sequence":[13,9,8,12]},{"word":"BEL","sequence":[13,9,10]},{"word":"BELT","sequence":[13,9,10,7]},{"word":"BELEE","sequence":[13,9,10,11,14]},{"word":"BEE","sequence":[13,9,12]},{"word":"BEEN","sequence":[13,9,12,8]},{"word":"BEET","sequence":[13,9,14,15]},{"word":"BEETLE","sequence":[13,9,14,15,10,11]},{"word":"BLET","sequence":[13,10,9,4]},{"word":"BLENT","sequence":[13,10,9,8,4]},{"word":"BLEE","sequence":[13,10,9,12]},{"word":"BENET","sequence":[13,12,8,9,4]},{"word":"BETEL","sequence":[13,14,15,11,10]},{"word":"ELEVEN","sequence":[14,10,11,6,9,8]},{"word":"EEVEN","sequence":[14,11,6,9,8]},{"word":"TEEK","sequence":[15,14,9,5]},{"word":"TEENE","sequence":[15,14,9,8,12]}]
   }


}

export default new DebugHelper();