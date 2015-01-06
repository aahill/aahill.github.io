---
layout: post
title: Arithmetic progression in Euler Problem # 1
---

Being extremely cold and wet as of late, I recently decided to take on the first project
Euler problem.  here it is:

> If we list all the natural numbers below 10 that are multiples of 3 or 5, 
> 	we get 3, 5, 6 and 9. The sum of these multiples is 23.
>	Find the sum of all the multiples of 3 or 5 below 1000.

A simple brute-force method is quite obvious; we simply loop through the numbers adding
up all relevant; excluding the numbers that are evenly divisible by 15 (to avoid double counting)
via short-circuiting the conditional statement. 

{% highlight java %}
public static int bruteForceMethod(){
        int sum = 0;
        for (int i = 0; i < 1000; i++){
            if (i % 3 == 0 || i % 5 == 0 )
                    sum += i;
        }
    return sum;
    }
{% endhighlight %}

A more elegant solution is to simply utilize <a href="http://en.wikipedia.org/wiki/Arithmetic_progression">arithmetic progression</a> 
to find the solution. Using this principle we can find the solution in O(1) as opposed to O(n)!

-----

To solve the problem, we need the sum of the multiples up to 1000, less the multiples of 15
written out, we can express this problem as below:

* sum = (multiples of 3) + (multiples of 5) - (multiples of 15)

more formally we get the expanded equation:

* sum = (3+6+9+...+ 999) + (5+10+15+...+995) - (15+30+45+...+990)

we can further extract the greatest common factor from each term:

* sum = 3(1+2+3+...+ 333) + 5(1+2+3+...+199) - 15(1+2+3+...+ 66)

-----

we can quickly find the sum of the arithmetic progression (AKA. a arithmetic series) by using the formula
**n(a+b)/2**, where:

* a = the first number in the series
* b = the last number in the series
* n = the number of terms in the series

using this formula, we can simply call a local function to find the
arithmetic series, multiply it by our greatest common factor, and
sum them together, as seen below.

{%highlight java %}
public static int findArithmeticSeries(int a, int b, int n){
    int ans = n * (a + b)/2;
    return ans;
}
        
public static int elegantMethod(){
	int multsOf3 = findArithmeticSeries(1,333,333);
    //sum of multiples of 5
    int multsOf5 = findArithmeticSeries(1,199,199);
    //sum of multiples of 15
    int multsOf15 = findArithmeticSeries(1,66,66);
    int ans = (3 * multsOf3) + (5 * multsOf5) - (15 * multsOf15);
    return ans;
}
{%endhighlight%}


Quite elegant!
