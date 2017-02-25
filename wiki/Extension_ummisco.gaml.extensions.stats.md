---
layout: default
title: Extension
wikiPageName: Extension_ummisco.gaml.extensions.stats
wikiPagePath: wiki/Extension_ummisco.gaml.extensions.stats.md
---

# Extension

----

 ummisco.gaml.extensions.stats

## Table of Contents
### Operators
[auto_correlation](#auto_correlation), [beta](#beta), [binomial_coeff](#binomial_coeff), [binomial_complemented](#binomial_complemented), [binomial_sum](#binomial_sum), [chi_square](#chi_square), [chi_square_complemented](#chi_square_complemented), [correlation](#correlation), [covariance](#covariance), [dnorm](#dnorm), [durbin_watson](#durbin_watson), [gamma](#gamma), [gamma_distribution](#gamma_distribution), [gamma_distribution_complemented](#gamma_distribution_complemented), [incomplete_beta](#incomplete_beta), [incomplete_gamma](#incomplete_gamma), [incomplete_gamma_complement](#incomplete_gamma_complement), [kurtosis](#kurtosis), [lgamma](#lgamma), [log_gamma](#log_gamma), [moment](#moment), [normal_area](#normal_area), [normal_density](#normal_density), [normal_inverse](#normal_inverse), [pbinom](#pbinom), [pchisq](#pchisq), [percentile](#percentile), [pgamma](#pgamma), [pnorm](#pnorm), [pValue_for_fStat](#pvalue_for_fstat), [pValue_for_tStat](#pvalue_for_tstat), [quantile](#quantile), [quantile_inverse](#quantile_inverse), [rank_interpolated](#rank_interpolated), [rms](#rms), [skew](#skew), [student_area](#student_area), [student_t_inverse](#student_t_inverse), [variance](#variance), 

### Statements


### Skills


### Architectures



### Species



----

## Operators
	
    	
----


[//]: # (keyword|operator_auto_correlation)
### `auto_correlation`

#### Possible use: 
  * `container` **`auto_correlation`** `int` --->  `float`
  *  **`auto_correlation`** (`container` , `int`) --->  `float` 

#### Result: 
Returns the auto-correlation of a data sequence
    	
----


[//]: # (keyword|operator_beta)
### `beta`

#### Possible use: 
  * `float` **`beta`** `float` --->  `float`
  *  **`beta`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the beta function with arguments a, b.
    	
----


[//]: # (keyword|operator_binomial_coeff)
### `binomial_coeff`

#### Possible use: 
  * `int` **`binomial_coeff`** `int` --->  `float`
  *  **`binomial_coeff`** (`int` , `int`) --->  `float` 

#### Result: 
Returns n choose k as a double. Note the integerization of the double return value.
    	
----


[//]: # (keyword|operator_binomial_complemented)
### `binomial_complemented`

#### Possible use: 
  *  **`binomial_complemented`** (`int`, `int`, `float`) --->  `float` 

#### Result: 
Returns the sum of the terms k+1 through n of the Binomial probability density, where n is the number of trials and P is the probability of success in the range 0 to 1.
    	
----


[//]: # (keyword|operator_binomial_sum)
### `binomial_sum`

#### Possible use: 
  *  **`binomial_sum`** (`int`, `int`, `float`) --->  `float` 

#### Result: 
Returns the sum of the terms 0 through k of the Binomial probability density, where n is the number of trials and p is the probability of success in the range 0 to 1.
    	
----


[//]: # (keyword|operator_chi_square)
### `chi_square`

#### Possible use: 
  * `float` **`chi_square`** `float` --->  `float`
  *  **`chi_square`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the area under the left hand tail (from 0 to x) of the Chi square probability density function with df degrees of freedom.
    	
----


[//]: # (keyword|operator_chi_square_complemented)
### `chi_square_complemented`

#### Possible use: 
  * `float` **`chi_square_complemented`** `float` --->  `float`
  *  **`chi_square_complemented`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the area under the right hand tail (from x to infinity) of the Chi square probability density function with df degrees of freedom.
    	
----


[//]: # (keyword|operator_correlation)
### `correlation`

#### Possible use: 
  * `container` **`correlation`** `container` --->  `float`
  *  **`correlation`** (`container` , `container`) --->  `float` 

#### Result: 
Returns the correlation of two data sequences
    	
----


[//]: # (keyword|operator_covariance)
### `covariance`

#### Possible use: 
  * `container` **`covariance`** `container` --->  `float`
  *  **`covariance`** (`container` , `container`) --->  `float` 

#### Result: 
Returns the covariance of two data sequences
    	
----


[//]: # (keyword|operator_dnorm)
### `dnorm`
Same signification as [normal_density](#normal_density)
    	
----


[//]: # (keyword|operator_durbin_watson)
### `durbin_watson`

#### Possible use: 
  *  **`durbin_watson`** (`container`) --->  `float` 

#### Result: 
Durbin-Watson computation
    	
----


[//]: # (keyword|operator_gamma)
### `gamma`

#### Possible use: 
  *  **`gamma`** (`float`) --->  `float` 

#### Result: 
Returns the value of the Gamma function at x.
    	
----


[//]: # (keyword|operator_gamma_distribution)
### `gamma_distribution`

#### Possible use: 
  *  **`gamma_distribution`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the integral from zero to x of the gamma probability density function.  

#### Comment: 
incomplete_gamma(a,x) is equal to pgamma(a,1,x).
    	
----


[//]: # (keyword|operator_gamma_distribution_complemented)
### `gamma_distribution_complemented`

#### Possible use: 
  *  **`gamma_distribution_complemented`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the integral from x to infinity of the gamma probability density function.
    	
----


[//]: # (keyword|operator_incomplete_beta)
### `incomplete_beta`

#### Possible use: 
  *  **`incomplete_beta`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the regularized integral of the beta function with arguments a and b, from zero to x.
    	
----


[//]: # (keyword|operator_incomplete_gamma)
### `incomplete_gamma`

#### Possible use: 
  * `float` **`incomplete_gamma`** `float` --->  `float`
  *  **`incomplete_gamma`** (`float` , `float`) --->  `float` 

#### Result: 
 Returns the regularized integral of the Gamma function with argument a to the integration end point x.
    	
----


[//]: # (keyword|operator_incomplete_gamma_complement)
### `incomplete_gamma_complement`

#### Possible use: 
  * `float` **`incomplete_gamma_complement`** `float` --->  `float`
  *  **`incomplete_gamma_complement`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the complemented regularized incomplete Gamma function of the argument a and integration start point x.
    	
----


[//]: # (keyword|operator_kurtosis)
### `kurtosis`

#### Possible use: 
  *  **`kurtosis`** (`container`) --->  `float`
  * `float` **`kurtosis`** `float` --->  `float`
  *  **`kurtosis`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the kurtosis (aka excess) of a data sequence
Returns the kurtosis (aka excess) of a data sequence
    	
----


[//]: # (keyword|operator_lgamma)
### `lgamma`
Same signification as [log_gamma](#log_gamma)
    	
----


[//]: # (keyword|operator_log_gamma)
### `log_gamma`

#### Possible use: 
  *  **`log_gamma`** (`float`) --->  `float` 

#### Result: 
Returns the log of the value of the Gamma function at x.
    	
----


[//]: # (keyword|operator_moment)
### `moment`

#### Possible use: 
  *  **`moment`** (`container`, `int`, `float`) --->  `float` 

#### Result: 
Returns the moment of k-th order with constant c of a data sequence
    	
----


[//]: # (keyword|operator_normal_area)
### `normal_area`

#### Possible use: 
  *  **`normal_area`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the area to the left of x in the normal distribution with the given mean and standard deviation.
    	
----


[//]: # (keyword|operator_normal_density)
### `normal_density`

#### Possible use: 
  *  **`normal_density`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the probability of x in the normal distribution with the given mean and standard deviation.
    	
----


[//]: # (keyword|operator_normal_inverse)
### `normal_inverse`

#### Possible use: 
  *  **`normal_inverse`** (`float`, `float`, `float`) --->  `float` 

#### Result: 
Returns the x in the normal distribution with the given mean and standard deviation, to the left of which lies the given area. normal.Inverse returns the value in terms of standard deviations from the mean, so we need to adjust it for the given mean and standard deviation.
    	
----


[//]: # (keyword|operator_pbinom)
### `pbinom`
Same signification as [binomial_sum](#binomial_sum)
    	
----


[//]: # (keyword|operator_pchisq)
### `pchisq`
Same signification as [chi_square](#chi_square)
    	
----


[//]: # (keyword|operator_percentile)
### `percentile`
Same signification as [quantile_inverse](#quantile_inverse)
    	
----


[//]: # (keyword|operator_pgamma)
### `pgamma`
Same signification as [gamma_distribution](#gamma_distribution)
    	
----


[//]: # (keyword|operator_pnorm)
### `pnorm`
Same signification as [normal_area](#normal_area)
    	
----


[//]: # (keyword|operator_pValue_for_fStat)
### `pValue_for_fStat`

#### Possible use: 
  *  **`pValue_for_fStat`** (`float`, `int`, `int`) --->  `float` 

#### Result: 
Returns the P value of F statistic fstat with numerator degrees of freedom dfn and denominator degress of freedom dfd. Uses the incomplete Beta function.
    	
----


[//]: # (keyword|operator_pValue_for_tStat)
### `pValue_for_tStat`

#### Possible use: 
  * `float` **`pValue_for_tStat`** `int` --->  `float`
  *  **`pValue_for_tStat`** (`float` , `int`) --->  `float` 

#### Result: 
Returns the P value of the T statistic tstat with df degrees of freedom. This is a two-tailed test so we just double the right tail which is given by studentT of -|tstat|.
    	
----


[//]: # (keyword|operator_quantile)
### `quantile`

#### Possible use: 
  * `container` **`quantile`** `float` --->  `float`
  *  **`quantile`** (`container` , `float`) --->  `float` 

#### Result: 
Returns the phi-quantile; that is, an element elem for which holds that phi percent of data elements are less than elem. The quantile need not necessarily be contained in the data sequence, it can be a linear interpolation.
    	
----


[//]: # (keyword|operator_quantile_inverse)
### `quantile_inverse`

#### Possible use: 
  * `container` **`quantile_inverse`** `float` --->  `float`
  *  **`quantile_inverse`** (`container` , `float`) --->  `float` 

#### Result: 
Returns how many percent of the elements contained in the receiver are <= element. Does linear interpolation if the element is not contained but lies in between two contained elements.
    	
----


[//]: # (keyword|operator_rank_interpolated)
### `rank_interpolated`

#### Possible use: 
  * `container` **`rank_interpolated`** `float` --->  `float`
  *  **`rank_interpolated`** (`container` , `float`) --->  `float` 

#### Result: 
Returns the linearly interpolated number of elements in a list less or equal to a given element. The rank is the number of elements <= element. Ranks are of the form {0, 1, 2,..., sortedList.size()}. If no element is <= element, then the rank is zero. If the element lies in between two contained elements, then linear interpolation is used and a non integer value is returned.
    	
----


[//]: # (keyword|operator_rms)
### `rms`

#### Possible use: 
  * `int` **`rms`** `float` --->  `float`
  *  **`rms`** (`int` , `float`) --->  `float` 

#### Result: 
Returns the RMS (Root-Mean-Square) of a data sequence. The RMS of data sequence is the square-root of the mean of the squares of the elements in the data sequence. It is a measure of the average size of the elements of a data sequence.
    	
----


[//]: # (keyword|operator_skew)
### `skew`

#### Possible use: 
  *  **`skew`** (`container`) --->  `float`
  * `float` **`skew`** `float` --->  `float`
  *  **`skew`** (`float` , `float`) --->  `float` 

#### Result: 
Returns the skew of a data sequence.
Returns the skew of a data sequence, which is moment(data,3,mean) / standardDeviation3
    	
----


[//]: # (keyword|operator_student_area)
### `student_area`

#### Possible use: 
  * `float` **`student_area`** `int` --->  `float`
  *  **`student_area`** (`float` , `int`) --->  `float` 

#### Result: 
Returns the area to the left of x in the Student T distribution with the given degrees of freedom.
    	
----


[//]: # (keyword|operator_student_t_inverse)
### `student_t_inverse`

#### Possible use: 
  * `float` **`student_t_inverse`** `int` --->  `float`
  *  **`student_t_inverse`** (`float` , `int`) --->  `float` 

#### Result: 
Returns the value, t, for which the area under the Student-t probability density function (integrated from minus infinity to t) is equal to x.
    	
----


[//]: # (keyword|operator_variance)
### `variance`

#### Possible use: 
  *  **`variance`** (`float`) --->  `float`
  *  **`variance`** (`int`, `float`, `float`) --->  `float` 

#### Result: 
Returns the variance of a data sequence. That is (sumOfSquares - mean*sum) / size with mean = sum/size.
Returns the variance from a standard deviation.

----

## Skills
	

----

## Statements
		
	
----

## Species
	
	
----

## Architectures 
	
