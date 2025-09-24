# Punnett Square Generator

A web-based tool built with vanilla JavaScript, HTML, and CSS to
generate Punnett squares for genetic crosses and calculate the resulting
phenotypic probabilities. This tool supports multi-trait crosses,
allowing for monohybrid, dihybrid, and more complex scenarios.

## Features

- **Dynamic Punnett Square Generation:** Automatically creates a Punnett square of the correct size based on the parent genotypes.

- **Multi-Trait Support:** Capable of handling complex genetic crosses involving multiple genes (e.g., AaBb, TtYyRr). The tool correctly calculates all possible gamete combinations for each parent.

- **Phenotypic Probability Calculator:** After generating the square, the tool provides an interface to calculate the probability of offspring expressing a specific combination of dominant or recessive traits.

- **Clear Results:** The calculated probability is displayed in a clear, easy-to-understand sentence, with the result given as both a percentage and a fraction.

- **Proper Allele Formatting:** Automatically orders alleles to consistently display the dominant allele first (e.g., aA becomes Aa).

## How to Use

1.  **Enter Genotypes:** Input the complete genotypes for two parents into the respective input fields. For example, for a dihybrid cross, you might enter AaBb for Parent 1 and aaBb for Parent 2.

2.  **Generate Square:** Click the \"Generate Punnett Square\" button. The corresponding Punnett square will be displayed below.

3.  **Calculate Probability:**

    - New input fields will appear, one for each gene (e.g., Trait A, Trait B).

    - In each field, type either \"**Dominant**\" or \"**Recessive**\" to specify the phenotype you want to find the probability for.

    - Click the \"Find Probability\" button.

4.  **View Results:** The calculated probability for your specified combination of traits will be displayed at the bottom of the page.

## Core Algorithms Explained

The power of this Punnett Square Generator lies in its ability to handle
multi-trait crosses (dihybrid, trihybrid, etc.). This is made possible
by a core algorithm that dynamically calculates all possible allele
combinations for a parent\'s gametes.

### Gamete Combination Generation (allCombinations function)

The most significant challenge in a multi-trait cross is determining the
set of all possible gametes. For a parent with genotype AaBb, the
possible gametes are AB, Ab, aB, and ab. The allCombinations function
solves this problem with a constructive, iterative approach.

**The Logic:**

The function takes an array of gene pairs (e.g., \[\'Aa\', \'Bb\',
\'Cc\'\]) and builds the final combinations one gene at a time.

1.  **Initialization:** It starts with an empty array called combinations.

2.  **First Gene:** The algorithm first processes the alleles of the first gene pair (e.g., \'Aa\'). It populates the combinations array with each individual allele.

    - After the first step, combinations is \[\'A\', \'a\'\].

3.  **Iterative Expansion:** For each subsequent gene pair (e.g., 'Bb\'), the algorithm performs an expansion:

    - It creates a new temporary array (tempCombinations).

    - It iterates through every existing entry in the combinations array (\'A\', then \'a\').

    - For each of these entries, it iterates through the alleles of the *new* gene (\'B\', then \'b\') and appends them.

    - This turns \'A\' into \'AB\' and \'Ab\'.

    - And turns \'a\' into \'aB\' and \'ab\'.

    - The tempCombinations array is now \[\'AB\', \'Ab\', \'aB\', \'ab\'\].

    - Finally, the main combinations array is replaced with this newly constructed temporary array.

4.  **Continuation:** This expansion process repeats for any remaining gene pairs. If a third gene \'Cc\' were present, each of the four existing combinations (\'AB\', \'Ab\', \'aB\', \'ab\') would be expanded with \'C\' and \'c\', resulting in eight unique trihybrid gametes.

This algorithm provides a scalable and robust solution, allowing the
generator to seamlessly transition from a simple monohybrid cross to a
complex multi-trait cross without any change to the core logic.

### Phenotypic Probability Calculation

Once the Punnett square is generated and stored in a 2D array,
calculating phenotypic probability is straightforward:

1.  The user specifies the desired phenotype (dominant or recessive) for each trait.

2.  The code iterates through every cell in the 2D array (representing each potential offspring).

3.  For each offspring\'s genotype, it checks if it expresses the user-defined phenotype for each trait. A dominant phenotype is expressed if at least one dominant allele is present.

4.  A running count is kept for the number of \"successful\" matches for each trait across all offspring.

5.  The final combined probability is calculated by multiplying the individual probabilities of each trait being expressed. The result is then displayed as both a fraction and a percentage.

## Technologies Used

- **HTML5:** Structures the web page and its content.

- **CSS3:** Provides the styling for the table and inputs.

- **JavaScript (Vanilla):** Contains all the core logic for parsing genotypes, generating gamete combinations, dynamically creating the Punnett square, and calculating probabilities.

## Possible Future Improvements

- **Input Validation:** Add checks to ensure that genotypes are entered in the correct format (e.g., even number of characters, valid letters) and that empty genotypes are refused.

- **UI/UX Enhancements:** Improve the user interface with a more modern design and clearer feedback for the user.

- **Advanced Genetics:** Expand the logic to handle more complex genetic concepts, such as incomplete dominance, codominance, or sex-linked traits.
