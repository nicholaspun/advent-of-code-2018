visited_freqs = { 0 => 0 }

freqs = IO.readlines('input.txt').map { |line| Integer(line) }
total = 0
index = 0
maxIndex = freqs.length
while true
    total += freqs[index]   
    break if visited_freqs.key?(total)
    visited_freqs[total] = 0    
    index = (index + 1) % maxIndex
end
p total    
