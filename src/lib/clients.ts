export type ClientLogo = {
  name: string;
  slug: string;
  width: number;
  height: number;
  markSlug?: string;
};

/** Exact client logo dimensions from the VINUS Figma component set. */
export const clients: ClientLogo[] = [
  { name: "Samsung", slug: "samsung", width: 132, height: 20 },
  { name: "LG CNS", slug: "lg-cns", markSlug: "lg-cns-mark", width: 114, height: 28 },
  { name: "DaeKyo", slug: "daekyo", width: 98, height: 28 },
  { name: "Koscom", slug: "koscom", width: 112, height: 22 },
  { name: "Shinhan Financial Group", slug: "shinhan-financial-group", width: 134, height: 24 },
  { name: "KEPCO", slug: "kepco", width: 124, height: 24 },
  { name: "KT alpha", slug: "kt-alpha", width: 94, height: 28 },
  { name: "Deloitte", slug: "deloitte", width: 112, height: 20 },
  { name: "Hyundai", slug: "hyundai", width: 154, height: 20 },
  { name: "Lotte Rental", slug: "lotte-rental", width: 132, height: 20 },
  { name: "NH Bank", slug: "nh-bank", width: 108, height: 20 },
  { name: "ACE", slug: "ace", width: 108, height: 28 },
  { name: "Gymboree", slug: "gymboree", width: 84, height: 20 },
  { name: "Korean Re", slug: "korean-re", width: 106, height: 36 },
  { name: "SGI", slug: "sgi", width: 116, height: 28 },
  { name: "NEPA", slug: "nepa", width: 68, height: 36 },
  { name: "K Shopping", slug: "k-shopping", width: 114, height: 26 },
  { name: "Ajou University", slug: "ajou-university", width: 122, height: 28 },
  { name: "Think Big", slug: "think-big", width: 118, height: 32 },
  { name: "Pulmuone", slug: "pulmuone", width: 88, height: 28 },
  { name: "Hunet", slug: "hunet", width: 78, height: 28 },
  { name: "Hankook Tire", slug: "hankook-tire", width: 124, height: 22 },
  { name: "Chunjae Education", slug: "chunjae-education", width: 96, height: 32 },
  { name: "Korea Federation of Banks", slug: "korea-federation-of-banks", width: 90, height: 38 },
  { name: "Yonsei University Health System", slug: "yonsei-university-health-system", width: 158, height: 32 },
  { name: "Lotte", slug: "lotte", width: 102, height: 32 },
  { name: "BNK", slug: "bnk", width: 106, height: 20 },
  { name: "Samsung Heavy Industries", slug: "samsung-heavy-industries", width: 140, height: 36 },
];
