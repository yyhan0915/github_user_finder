import * as React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: string;
  height: string;
  style: object;
}

export const Image: React.FC<Props> = (props: Props) => <img {...props} />;
