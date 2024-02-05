import React from "react";
import moment from "jalali-moment";
import { useEffect,useState,useRef } from "react";

const DataAndTime = () => {
  const e2p = (s: string) => s.replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
  const [initialDateTime, setInitialDateTime] = useState<string>("");

  const initialDateTimeRef = useRef<string>();
  useEffect(() => {
    const jMoment = moment().locale('fa');
    const formattedDateDay = jMoment.format('DD');
    const formattedDateMonth = jMoment.format('MMMM');
    const formattedDateYear = jMoment.format('yyyy');
    const formattedTime = jMoment.format('HH:mm');

    const initialDateTimeValue = `${e2p(formattedDateDay)} ${formattedDateMonth} ${e2p(formattedDateYear)} ساعت ${e2p(formattedTime)}`;
    initialDateTimeRef.current = initialDateTimeValue;
    setInitialDateTime(initialDateTimeValue);
  }, []);

  return (
    <div className="text-[#718096] font-thin w-[160px] h-[24px] mr-1">
    <span>{initialDateTime}</span>
    </div>
  );
};

export default DataAndTime;
