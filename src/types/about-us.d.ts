type AboutUsStaticType = {
  header: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
};

// **
type AboutUsOverviewType = {
  type: string;
  count: number;
};

// **
interface KnowMoreType {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

// **
interface WhyThisBlogType extends KnowMoreType {}
