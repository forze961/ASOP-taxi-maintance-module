export interface DutyObj {
  num: string;
  tariff: string;
  endpoints: {
    start: string;
    end: string;
  };
  trips: [{ trip: string; time: string }];
  stations: [
    {
      name: string;
    },
    {
      name: string;
    },
  ];
  carrier: number;
}
