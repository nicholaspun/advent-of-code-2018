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

min_so_far = polymer.length
('a'..'z').each do |unit|
    p unit
    new_polymer = polymer.delete(unit).delete(unit.upcase)
    new_reduction = reduce(new_polymer).length
    min_so_far = new_reduction if new_reduction < min_so_far
end

p min_so_far - 1
