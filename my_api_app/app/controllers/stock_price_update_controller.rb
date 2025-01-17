class StockPriceUpdateController < ApplicationController
  require "httparty"

  def create
    target_codes = [
      "72030", "83060", "61780", "83160", "99840",
      "72670", "94320", "84110", "80580", "71820",
      "80310", "67580", "45020", "72010", "62010",
      "87660", "77510", "94330", "80010", "80530",
      "70110", "65010", "72020", "77520", "70130",
      "69020", "65030", "65060", "65040", "65080",
      "65050", "65070", "65130", "65160", "65170",
      "65210", "65220", "65230", "65240"
      ]
    
    target_codes.each do |code|
      response_data = fetch_one_weeek_stock_price(code)

      one_week_stock_price = response_data["daily_quotes"]

      bulk_insert_stock_prices = reject_existing_stock_price(code, one_week_stock_price)
      StockPrice.insert_all(bulk_insert_stock_prices)
    end

  end

  private

  def reject_existing_stock_price(code, one_week_stock_price)
    bulk_insert_stock_prices = []

    recorded_dates =  StockPrice.where(company_code: code).pluck(:date).map(&:to_date)

    one_week_stock_price.each do |quote|
      
      quote_date = Date.parse(quote["Date"])
      next if recorded_dates.include?(quote_date)

      bulk_insert_stock_prices << {
        company_code: quote["Code"].to_i,
        date: quote["Date"],
        close_price: quote["Close"]
      }
    end
    bulk_insert_stock_prices

  end

  def fetch_one_weeek_stock_price(code)
    id_token = fetch_token["idToken"]

    base_url = "https://api.jquants.com/v1/prices/daily_quotes"
    to = Date.today.strftime("%Y%m%d") # 本日の日付
    from = (Date.today - 21.days).strftime("%Y%m%d") # 一週間前の日付

    response = HTTParty.get(
    base_url, 
    query: {code: code, from:from, to:to},
    headers: {Authorization:  id_token}
    )
    JSON.parse(response.body)
  end

  def fetch_token
    base_url = "https://api.jquants.com/v1/token/auth_refresh"
    refreshtoken = "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.mC0mDrolE_llFa4DVl2aW1IL76s2LKj37yffgLnV1TNVyKwGxM5e_9YNPMjXjRQm988DudmbYAw6bIEmSt6P92coTot4R4BOipdkGJtrR6y0nzwL73-dR8IFHtcuVHlzn9NsKGEUmSRVpo4kqT2GPrCNWG10Sgx-PzLzK3maBOFXs0AC5-cwsSjUWmE8aVAAj62TPOpuB62bPpFI5w3sQa0hEW0WXxxgCL6yURu99GFPhPr7MJLTwvR-l7heZr-q2SkGVppCzdGkWTJZEjfz4ZBx6uxOBRapJd-It2cc55nrsxzoUt-fu689V2DtPMEN-bYk0b2DFzJsxCHFIU4ecw.KPspt8e5oNE0ncw8.uGPCfuZO1rSD6hI_p3vF_JGz7vf5UkzSZRt9aJ0NmWkeow4as9myONbPhetjYknVZ3im2gbXEXpszR56Wz7gCknhNFE5WfAjLkwnrG4Ug4aB5vauPXCnjQqI-iXNxOhI8y5fQQby-9q8wUbPL-B0JhUC3DI-MiTdm3Zf9patJlMBKRh1bzg2Q1Mkt4hlgE342NFLS-ZqVSIg55yRPJmuYgsewhKaSDYGO6U4OF66LmtNN5BovMlcJHnmjlJo8XHGDwxLPnaQjq2iW3wTZON3lRuCv9Zj7QQbinaiFjNHknNfL8l-wRarEoVOxkBMSATRoTEMg4G_hyPfMybplYsZhplw5my81xJOTviPSzwmifGt2ni2EWNGrZG224Vt-S0_TDoHpEtahReaPvqeTyxDKMbIfTjcgg3ATL5R5yb5sLJm98xdjANcvO4C0UlcI8z8tR9vC3aOPzRd-znC-Ot4N-9zleB57woNF-R26j-5ubtTULjLROA0eI_hi5prrwyul1hH4IXtni0pv424g37lW4ILAhOp3R4goNGNwOMFSjqvHuWTJ6Zrd3UGB197CE5ft3YD4N0NLrLd2NNJ5SVklMgIQ7O_0h8_8sHiSFIw5aLT466bs_LiOobvfxFfIUgFV7P41orYqwT12RmTSfO4icK54uiD5dnHo8n9x-AlJGweBF3Ovf9zLLp_6HpDw6cu4IGi-0Hp_SWCs9VAg7QYJHVYx4HLRxR23_SzCS8UDKG7oKuKT1KzE7hl6Tb9okG5BT892aXaIrzruDkQxnaoBzVnGNlEF4Kg9WVnX32IqV_SCV6y5rNnaPGsTeVsf_jioeFayNIAPKgbJB38rLXuLGpnfQfGwnPtnoVg0l4AfAiSTmnFVImOxa9mnpAQqCzImipPr1lw4FvaECpijyv-aCj-2yvQ25nb9-TxREtbWT6V-NLz8RY50N_Th8BfeTfsoMdin8ZqUX87wVRBHyAVWpQQ0PBnQ-bRTqhVJG93yfQDrYLYMwAQO6IVf_TCwBUHDd1Ia2lDQ37wBx2o7E-ASuKUh5aVptcRMuVw6oaN4_c38tsQLb54FGnKrrrGWdrscm8QODIuKwF64R1se8wLPWZaX15heQeUff7MAXaJG9chWfovKyTIR4df-a2bx33JG9VITbnQoT7xURiquS9wKLw_fD5qdE-qSfIY7Q5BVDzl-tA84MvOuAtAjTuxXJuDT9Sib9NDz3qjY-V4pwdRUEPqtL8WKHZTIKATw6B3oBCmsNH1PE4Bq3sw08OcpoqCdfkvG62jmDEc4cym-6kCn-4q_rkpmWyPk8OdQFvVL_pAuJD6I0yR71BJz5KdjazsxT9JVLgDB4Zfsg.19phWW_elAHMCVysQGOOsQ"

    response = HTTParty.post(base_url, query: { refreshtoken: refreshtoken })

    JSON.parse(response.body)
    
  end
end
