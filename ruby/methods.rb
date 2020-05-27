
# functions and methods terminology are interchangeable?

def sayHi(name)
    puts "Enter name: "
    puts "Hello, " + name 
end

def default_values(name="No name")
    puts name + " was entered"
end

sayHi("Coleman")
default_values()

# this is strange

def cube(num)
    return num * num * num
    "Unreachable; but I don't throw an error"
end

def cubedWithString(num)
    return num * num * num,
    "Unreachable; but I don't throw an error"
end

cubed = cube(2)
cubedWithStr = cubedWithString(2)
puts cubed, cubedWithStr