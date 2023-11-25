type ContactUsType = {
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  time: {
    days: string;
    hours: string;
    description: string;
  };
  data: {
    phone: string;
    email: string;
  };
};

// **
type ContactUsQueryType = string[];
