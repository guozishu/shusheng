v.date = function (str) {
  const arr = str.split(/\D+/g)
  while (arr.length < 6) {
    arr.push(0)
  }
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
}
