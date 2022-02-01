import { useEffect, useState } from "react";

import "./App.css";

export default function App() {
  const [token, setToken] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { access_token }: { access_token: string } = await fetch(
      "https://servant.qa2.railz.ai/auth/login",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en",
          "content-type": "application/json;charset=UTF-8",
          "sec-ch-ua":
            '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
        },
        referrer: "https://dashboard.qa2.railz.ai/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify({
          email: "apinheiro+qa2qa@railz.ai",
          password: "-",
        }),
        method: "POST",
        mode: "cors",
        credentials: "omit",
      }
    ).then((response) => response.json());
    setToken(access_token);
  }, []);

  return (
    <div>
      {token && (
        <railz-visualizations
          configuration={JSON.stringify({ token, debug: true })}
          filter={JSON.stringify({
            businessName: "QuickTestFreshbooks",
            serviceName: "freshbooks",
            // connectionId: "connectionId",
            reportType: "balanceSheets",
            startDate: "2021-01-01T00:00:00.000Z",
            endDate: "2022-01-28T00:00:00.000Z",
            reportFrequency: "month",
          })}
          debug
        />
      )}
    </div>
  );
}
