def calcurate(number)
  if number.nil?
    0
  elsif number.zero?
    number + 1
  else
    number * 2
  end
end