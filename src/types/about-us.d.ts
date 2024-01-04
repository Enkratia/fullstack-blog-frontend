// type AboutUsStaticType = {
//   imageUrl: string;
//   headerTitle: string;
//   headerDescription: string;
//   missionTitle: string;
//   missionDescription: string;
//   visionTitle: string;
//   visionDescription: string;
// };

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
  imageUrl: string;
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
