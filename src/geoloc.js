import React, { useState, useEffect } from 'react';
import https from 'https';

function GeoLoc() {
  const [userIp, setUserIp] = useState('');
  const [userCont, setUserCont] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userIsp, setUserIsp] = useState('');
  const [usertz, setUsertz] = useState('');
  const [countIcon, setCountIcon] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await https.get('https://api.ipgeolocation.io/ipgeo?lang=en&apiKey=f750873480be458aaa0c90138c5758b2');
        const data = await response.data;

        const userIPData = JSON.parse(data);
        setUserIp(userIPData.ip);
        setUserCont(userIPData.continent_name);
        setUserCountry(userIPData.country_name);
        setUserCity(userIPData.city);
        setUserIsp(userIPData.isp);
        setUsertz(userIPData.time_zone.name);
        const ctryIcon = userIPData.country_tld;
        const ctryflag = ctryIcon.slice(1, 3);
        const ctryIcn = userIPData.country_tld.slice(1, 3);
        const countIcon = `https://ipgeolocation.io/static/flags/${ctryIcn}_64.png`;
        setCountIcon(countIcon);
      } catch (error) {
        console.error('Error fetching IP geolocation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Request is coming from IP - {userIp}, Continent - {userCont}, Country - {userCountry}.</h1>
      <h1>User City is {userCity}, User ISP - {userIsp}, & Time Zone is {usertz}.</h1>
      <img src={countIcon} alt="Country Flag" />
    </div>
  );
}

export default GeoLoc;
