export const mergeSort = (myArray) => {
  const n = myArray.length;
  if (n <= 1) {
    return myArray;
  } else {
    const mid = Math.trunc(n / 2);
    let arr1 = mergeSort(myArray.splice(0, mid));
    let arr2 = mergeSort(myArray);
    let sorted = [];
    while (arr1.length > 0 && arr2.length > 0) {
      if (arr1[0] < arr2[0]) sorted.push(arr1.splice(0, 1)[0]);
      else sorted.push(arr2.splice(0, 1)[0]);

      if (arr1.length == 0) return [...sorted, ...arr2];
      else if (arr2.length == 0) return [...sorted, ...arr1];
    }
  }
};
