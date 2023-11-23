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
