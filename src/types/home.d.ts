type UsMissionType = {
  about: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
};

// **
type WhyWeStartedType = {
  imageUrl: string;
  subtitle: string;
  title: string;
  description: string;
};

// **
type FeaturedCompanyType = {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
};

type TestimonialStaticType = {
  subtitle: string;
  title: string;
  description: string;
};

// **
type TestimonialType = {
  id: number;
  text: type;
  imageUrl: type;
  fullname: type;
  address: type;
};
