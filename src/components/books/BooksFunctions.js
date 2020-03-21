import moment from "moment";

export const BOOKS_API = "https://libreriabiblica.org/api/books";
export const BOOKS_LS = "bookstore-items";
export const setWithExpiry = (key, value) => {
  const now = moment();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.add(1, "hour")
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getLSItems = key => {
  const item = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!item) {
    return null;
  }
  const data = JSON.parse(item);

  const now = moment();
  // compare the expiry time of the item with the current time
  if (now > data.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return data.value;
};

export const formatURI = str => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  // return str.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase()
};
