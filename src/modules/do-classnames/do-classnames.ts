const doClassnames = (classes: Array<string | null | undefined | boolean>) => {
  return classes.filter((n) => n).join(' ')
}

export default doClassnames
