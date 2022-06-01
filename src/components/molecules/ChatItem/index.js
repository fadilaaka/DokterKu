import React from 'react';
import IsMe from './IsMe';
import IsOther from './IsOther';

export default function ChatItem({isMe, text, date, photo}) {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <IsOther text={text} date={date} photo={photo} />;
}
