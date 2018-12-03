p IO.readlines('input.txt').reduce(0) { |total, freq| total += Integer(freq) }
