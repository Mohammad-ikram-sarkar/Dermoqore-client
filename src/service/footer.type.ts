export interface FooterLink {
  id: string;
  label: string;
  href: string;
  sectionId: string;
}

export interface FooterSection {
  id: string;
  title: string;
  footerId: string;
  links: FooterLink[];
}

export interface FooterSocial {
  id: string;
  name: string;
  icon: string | null;
  url: string;
  footerId: string;
}

export interface FooterData {
  id: string;
  logo: string | null;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  copyright: string | null;
  createdAt: string;
  updatedAt: string;
  socialLinks: FooterSocial[];
  sections: FooterSection[];
}
