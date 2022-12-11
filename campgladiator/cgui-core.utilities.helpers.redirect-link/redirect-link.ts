const redirectLink = (link: string, isNewTab: boolean = false) => {
  const src = link ? link : "#";
  const target = isNewTab ? "_blank" : "_self";
  return window.open(src, target);
};

export default redirectLink;
