def parseClaim(claim):
    import re 

    matchObject = re.match(r'#(\d.*) @ (\d.*),(\d.*): (\d.*)x(\d.*)', claim)
    return {
        'claimId': int(matchObject.group(1)),
        'leftEdge': int(matchObject.group(2)),
        'topEdge':int(matchObject.group(3)),
        'width': int(matchObject.group(4)),
        'height': int(matchObject.group(5))
    }

file = open('input.txt', 'r')

claims = [parseClaim(claim) for claim in file]

maxWidth = reduce(
    lambda maxSoFar, claim: max(maxSoFar, claim['leftEdge'] + claim['width'] - 1), 
    claims, 
    0
)
maxHeight = reduce(
    lambda maxSoFar, claim: max(maxSoFar, claim['topEdge'] + claim['height'] - 1),
    claims,
    0
)

fabric = [['.'] * maxWidth for i in range(maxHeight)]

for claim in claims:
    for i in range(claim['width']):
        for j in range(claim['height']):
            fabricSquare = fabric[claim['topEdge'] + j - 1][claim['leftEdge'] + i - 1] 
            fabric[claim['topEdge'] + j - 1][claim['leftEdge'] + i - 1] = claim['claimId'] if fabricSquare == '.' else 'X'
                        

dupCount = reduce(lambda count, col: count + col.count('X'), fabric, 0)
print dupCount 
                 

