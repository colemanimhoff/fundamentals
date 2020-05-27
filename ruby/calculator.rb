
# ruby automatic converts user input to a string

puts "Enter a number: "
num1 = gets.chomp()

puts "Enter another number: "
num2 = gets.chomp()

# concats strings
puts (num1 + num2)

# converts to int
puts (num1.to_i + num2.to_i)
# converts to float
puts (num1.to_f + num2.to_f)