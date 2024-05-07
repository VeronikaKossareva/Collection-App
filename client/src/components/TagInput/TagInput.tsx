// import React, { useState } from 'react';
// import { WithContext as ReactTags, Tag } from 'react-tag-input';

// const KeyCodes = {
//   comma: 188,
//   enter: [10, 13],
// };

// const delimiters = [...KeyCodes.enter, KeyCodes.comma];

// interface TagInputProps {}


// const TagInput: React.FC<TagInputProps> = () => {
//   const [tags, setTags] = useState<Tag[]>([]);

//   const handleDelete = (i: number) => {
//     setTags(tags.filter((tag, index) => index !== i));
//   };

//   const handleAddition = (tag: Tag) => {
//     setTags([...tags, tag]);
//   };

//   return (
//     <ReactTags tags={tags}
//                handleDelete={handleDelete}
//                handleAddition={handleAddition}
//                delimiters={delimiters}
//                autocomplete={true}
//                inputFieldPosition="bottom" />
//   );
  
// };

// export default TagInput;
