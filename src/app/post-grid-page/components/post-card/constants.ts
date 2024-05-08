import { PostCard } from '../../models/Post.model';

export const DEFAULT_PROPERTY_TO_DISPLAY: keyof PostCard = 'title';
export const PROPERTIES_OF_POST: Array<keyof PostCard> = [
  'userId',
  'id',
  'title',
  'body',
];
