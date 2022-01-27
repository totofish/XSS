import { IScriptItem } from '../../types';

export default function importFormatHelper(data: Array<IScriptItem>): Array<IScriptItem> {
  if (!Array.isArray(data)) return [];
  let savelist: Array<IScriptItem> = [...data];
  savelist = savelist.filter((item) => (
    Object.prototype.hasOwnProperty.call(item, 'title')
      && Object.prototype.hasOwnProperty.call(item, 'code')
  ));
  savelist = savelist.map((item) => ({
    autoExecute: !!item.autoExecute,
    title: item.title,
    code: item.code,
  }));
  return savelist;
}
