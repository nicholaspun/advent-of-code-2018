polymer = IO.read('input.txt')

def reduce(polymer)
    prev_char = ''
    start_index = 0
    found_reaction = false
    polymer.each_char.with_index do |char, index|
        if char.swapcase == prev_char
            start_index = index - 1
            found_reaction = true
            break    
        end
        prev_char = char
    end
    
    if found_reaction
        polymer.slice!(start_index, 2)
        return reduce(polymer)
    end

    return polymer
end

p reduce(polymer).length - 1

