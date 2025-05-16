class StockPrice < ApplicationRecord
  # JaQuantsのAPIから取得した銘柄情報（証券コードや会社名）をDBに保存する構成上、
  # Company.id ではなく、証券コードである Company.code を主キー的に扱っている。
  # StockPriceは company_code を持ち、それを Company.code に紐づける必要があるため、
  # foreign_key と primary_key を明示的に指定して関連付けている。
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :date, presence: true
  validates :close_price, presence: true
end
