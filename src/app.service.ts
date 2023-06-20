import { Injectable } from '@nestjs/common';

// build Markov Chain data structures;
// while( more words to generate ) {
//    generate next word;
//    if( word is short enough to fit on current output line )
//       add word and trailing space(s) to the line;
//          // Two spaces if it is the end of a sentence.  See below.
//    else {
//       add spaces to justify the line; // details in phase 3
//       print the line;
//       clear the linked list;
//       add the word and trailing spaces to the line;
//    }
// }
// if( output line is not emtpy )
//    print output line;

function justifyText(text: string, lineLength: number): string {

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLineLenght: number = 0;
  let spaceNeeded: number = 0;
  let finalText = '';

  for (const word of words) {
    if (currentLineLenght + word.length + 1 <= lineLength) {
      lines.push(word);
      currentLineLenght += word.length + 1
    } else {
      spaceNeeded = lineLength - currentLineLenght
      finalText += justifyLine(lines, spaceNeeded)
    }
  }

  return finalText

}

function justifyLine(words: string[], spaceNeeded: number) {
  let finalLine = ''
  const spacePerWord = words.length / spaceNeeded
  
  for (const word of words) {
    finalLine += word + ' '.repeat(Math.floor(spaceNeeded / spacePerWord))
    spaceNeeded -= spacePerWord
  }

  return finalLine
}

@Injectable()
export class AppService {
  justify(text: string): string {
    const widthtext: number = 80

    const justifiedText = justifyText(text, widthtext);

    return justifiedText;
  }

  getToken(): string {
    return 'Hello World!';
  }
}

