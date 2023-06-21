import { Injectable } from '@nestjs/common';

function addWordToResult(res: string[], buf: string[], maxWidth: number) {
  // How many spaces are needed
  let spaces :number = maxWidth - buf.reduce((acc, cur) => cur.length + acc, 0);
  
  // If there is only one word on the line
  // then just add the padding to the end and return
  if (buf.length === 1) {
      buf[0] += ' '.repeat(spaces);
      res.push(buf[0]);
      return;
  }
  
  // If the line has more than one word,
  // decrement the spaces which are created during the buf.join(' ')
  // which is n - 1 spaces
  spaces -= buf.length - 1;
  
  // All words except the last should have spaces added to their string
  const end = buf.length - 1;
  let index = 0;
  
  // If there are spaces to distribute, distribute them
  // evenly looping back to the beginning of the buffer
  while (spaces-- > 0) {
      buf[index] += ' ';
      
      index = (index + 1) % end;
  }
  
  res.push(buf.join(' '))
}

function justifyText(text: string, lineLength: number): string {

  const words: string[] = text.split(' ');
  const res: string[] = [];
  let buf: string[] = [];
  let width: number = lineLength;

  words.forEach(word => {
    // Check if the word fits in the current line
    // A word fits if theres enough room for the word and
    // a space between it and the word to the left
    if (word.length <= (width - buf.length)) {
        buf.push(word);
        width -= word.length;
    } else {
        // The word did not fit on the line, send this line for padding
        addWordToResult(res, buf.slice(), lineLength);
        
        // Start a new line with the current word
        buf = [word];
        // reset the current line width
        width = lineLength - word.length;
    }
  });

  // This is the final lines processing
  // According the rules this should only be left justified
  // so add all padding to the right not between the words
  if (buf.length) {
      let str = buf.join(' ');
      str += ' '.repeat(lineLength - str.length);
      res.push(str);
  }

  let finalresult : string = '';

  res.forEach((value) => {
    finalresult += value + '\n'
  })

  return finalresult;

}

@Injectable()
export class AppService {
  justify(text: string): string {
    const widthtext: number = 80

    const justifiedText = justifyText(text, widthtext);

    return justifiedText;
  }
}

