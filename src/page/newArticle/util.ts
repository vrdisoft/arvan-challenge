import { TagType } from "./component/tag";

const sortTagList = (list: TagType[]) => {
  return list.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

const getSelectedTags = (list: TagType[]): string[] => {
  return list
    .filter((item) => {
      return item.isChecked === true;
    })
    .map((item) => {
      return item.name;
    });
};

export { sortTagList, getSelectedTags };
