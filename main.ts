import { createItem, getItem, updateItem, deleteItem } from './crud-opperations';
(async () => {
    await createItem("1","Martina Velkovikj", 22);
    await getItem("1");
    await updateItem("1","Ivana Stefanovska");
    await createItem("2","Martina Velkovikj", 22);
    await createItem("3","ToBeDeleted", 22);
    await deleteItem("3");
  })(); 