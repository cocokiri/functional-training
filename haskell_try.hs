
--https://app.codesignal.com/arcade/intro/level-2/yuGuHvcCaFCKk56rJ/description?solutionId=bXPuQ2GQox3yJkJjB

--my solution
shapeArea n = n*n + (n-1)*(n-1)

shapeArea :: Int -> Int
shapeArea n = square n + square (n - 1)

square :: Int -> Int
square x = x * x


