require "httparty"

class StockPrice
  module WeeklyStockFetcher
    class << self
      def call(code)
        id_token = fetch_token["idToken"]

        base_url = "https://api.jquants.com/v1/prices/daily_quotes"
        to = Date.today.strftime("%Y%m%d") # 本日の日付
        from = (Date.today - 21.days).strftime("%Y%m%d") # 一週間前の日付

        response = HTTParty.get(
        base_url,
        query: { code: code, from: from, to: to },
        headers: { Authorization:  id_token }
        )
        JSON.parse(response.body)
      end

      private

      def fetch_token
        base_url = "https://api.jquants.com/v1/token/auth_refresh"
        refreshtoken = "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Wa4_KrWL4vA0PykmymqnjtxrI6TFGJZUXUxnqIylKmnv7YNmFyOU1EknqMYULVDzjH7daO4jRwj0YDVs1FBjpAvnp1fwvP0Fjqf-_mFb6cMbj6YoGGIykRgE7snGLHUlj5b8r-7UEJPVG013mZB6eN-N70Ke9gJ6V-pi9qA42dYz1iBLPLm4-up0hFQiJOXmEbWjeR6OJZ2EWJwrbSM9aoZEFkB72Hjv8KyNVhpj05A3lvvpa-QU807ZMehjqeErmBBJF_IT45SOTred-3M3mfhpjYUF8-r7RLomEIH3QlxHvB-KyNRUMQDiGd_lOpLYAu01UBjL4zhGdRd3-Qk7iQ.frrd-ApxYfKAzxCq.QDRA4BbGW4ts6m1AmSDHYyGTPZfgy3tFejTbtntpghr2VMJ0wmiWumklepItDBsR7hTG3qzshTh7rjrym6n58P1OguNvfa6EXbmbGMRBTK776PxxKRaNKjuwe0Yo7gSb5XigkJxrVsl_g0Wh7fjqNOt77vWmEhXaZAE_I24ROLpaJ8uGUVLgzckDSwZpnd-JcvNM2VKRVJ0E0nkAmINfAhQMnapHOhsObENJrekl5y_kO3UL_LX37ntDLeNo0FD2n74iNyDvhwZDFmbiSwh3wbfJ2p0xlrJfCU3pfQK4KDoRA2iXs18yDMbZ-zRFFwlEPQQ-InU0qHN3hM40SP-URI8UtRhuZjRvVLQivuVOGYbckF1U8imLGrI6lngdXPpO2gdDsr_Yz1bGqz5XjFwYAskALURj3cTBaFeLTB3u1vMyyt8GcgNEbFtpOZgNFfsGvrRuFzVJ8CH0HSAMtO61iWJ44GK6ahAprA-J35AC_WcuBsH6FD5ykpTf1-STN1ioXPspLu9HCOqxtyeWQ-o3NV2rCW2kziS4Hpuo8_97TQxvfpq-DRC_DA2HPs_PWqTt4dRziRh_MtCllZNmwmWUb-0-eGA2ocfO_G77tYxpXZ2_VPwiJLZulgWrc8lL9c19K0xVVKqevyVDUPygN8goLXXmDPS-rGXgtq9KrevxybSBLxkvBzAdAkCCxNTAIzjvBmaXdSiespDbnQ0kQnrYpeNeNxP6_FcL-0OnDRX49cTvyexerLOaokNOKlkvk-ahOQCdMVNWZlr8ELFXkhT9oOGNMvvYjZY8cuNKXEhUlFPZ82kNSe6EPZSpUauSv8YHh3TArw_Hlff_4L-WaDWmBqzmQwQug8r5GzFXGgtxS_fM1jyqPEJlGhfQ25nEyHZkneJo2wVMyxNytS1LjIJ14qmq1wPAkRPdKnHx_-p6VZzqizbOAhF0v77pfGGQt7-mdbthGG4Y1SNuLY-_wmb0hCwMScVl1GUEDYZFzLGmgl21S9cuuh_lHxRB5_k-cZcAB9gt-0SJNbBNakD_816gKhjRzqG3nKLyAkmZ7oOHrsDSJhtSjxopYUF7jv19lJbdBk-LWpfUVE4bd81ARCIJupMnlY0Hg2OBw3qoSBHIgDj5Vp6qg5dQiRuSZI-PgrEtTRSB_QLG_Yn7GX6nzjapeP16OzI0mOGL2RBClSoZVSg0eyUM0GfK0y1szMNEWXXQjt1v3PHrGO9BeW-8taUe-IlTp90T91tFOzJJCRZv5aYxeE7pXJXtXGwduDo1GUrtFhSQjS_MaIdh_saKx7BJRT-aySi50PHLL9skyrqeFMTrz330IvUTf9oI2QzZuO3eKbwEijtm_laGgA.ik-tTvpuwyeOMEuLDxrb0g"

        response = HTTParty.post(base_url, query: { refreshtoken: refreshtoken })

        JSON.parse(response.body)
      end
    end
  end
end
