import React from 'react';
import IsMe from './IsMe';
import IsOther from './IsOther';

export default function ChatItem({isMe}) {
  if (isMe) {
    return <IsMe />;
  }
  return <IsOther />;
}
