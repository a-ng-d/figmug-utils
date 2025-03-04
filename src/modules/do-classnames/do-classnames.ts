const doClassnames = (classes: Array<string | null | undefined>) => {
  return classes.filter((n) => n).join(' ')
}

export default doClassnames
