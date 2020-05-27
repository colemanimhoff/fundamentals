
with_spaces = "  Hello  "
puts with_spaces.length()

with_spaces = with_spaces.strip()
puts with_spaces
puts with_spaces.reverse()
puts with_spaces.include? "l"

# access index
puts with_spaces[0]
# access range
puts with_spaces[0, 4]
# index of
puts with_spaces.index("H")

