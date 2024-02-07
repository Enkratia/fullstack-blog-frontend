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
  contact: {
    phone: string;
    email: string;
  };
};

// **
type ContactUsQueryType = {
  id: number;
  content: string;
};

type ContactUsQueriesType = ContactUsQueryType[];
