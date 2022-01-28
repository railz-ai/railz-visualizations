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
    try {
      const balanceSheet = await fetch(
        "https://api.qa2.railz.ai/reports/balanceSheets?startDate=2020-12-01&serviceName=freshbooks&businessName=QuickTestFreshbooks&endDate=2021-12-31&reportFrequency=month",
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      ).then((response) => response.json());

      console.log({ balanceSheet });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <div>
      {token && (
        <railz-visualizations
          configuration={JSON.stringify({ token: token })}
          filter={JSON.stringify({
            businessName: "businessName",
            serviceName: "quickbooks",
            connectionId: "connectionId",
            reportType: "balanceSheet",
            startDate: "2022-01-24T00:00:00.000Z",
            endDate: "2022-01-25T00:00:00.000Z",
            reportFrequency: "month",
          })}
          debug
        />
      )}
    </div>
  );
}
