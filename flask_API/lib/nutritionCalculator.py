import lib.ingredientsConstants as IGC


    # if amount < IGC.CALORIES[0]:
    #     return 0

    for i in range(len(IGC.CALORIES) - 1, -1, -1):
        if amount > IGC.CALORIES[i]:
            # print(i, IGC.CALORIES[i])
            return i
    return 0



    for i in range(len(IGC.SUGAR) - 1, -1, -1):
        if amount > IGC.SUGAR[i]:
            # print(i, IGC.SUGAR[i])
            return i
    return 0


    # if (saturatedFat) == 0:
    for i in range(len(IGC.PERCENTATGE_SATURATED_FAT) - 1, -1, -1):
            # print(i, IGC.PERCENTATGE_SATURATED_FAT[i])
            return i
    return 0


    for i in range(len(IGC.SODIUM) - 1, -1, -1):
        if amount > IGC.SODIUM[i]:
            # print(i, IGC.SODIUM[i])
            return i
    return 0


    for i in range(len(IGC.PROTEIN) - 1, -1, -1):
        if amount > IGC.PROTEIN[i]:
            # print(i, IGC.PROTEIN[i])
            return i
    return 0


    for i in range(len(IGC.FIBER) - 1, -1, -1):
        if amount > IGC.FIBER[i]:
            # print(i, IGC.FIBER[i])
            return i
    return 0


    for i in range(len(IGC.CARBOHYDRATES) - 1, -1, -1):
        if amount > IGC.CARBOHYDRATES[i]:
            # print(i, IGC.CARBOHYDRATES[i])
            return i
    return 0


    calories, sugar, saturatedFat, totalFat, sodium, protein, fiber, carbohydrates
):
    raw_score = (
        calculate_calories(calories)
    ) - (
        calculateProtein(protein)
        + calculateFiber(fiber)
        calculate_protein(protein)
        + calculate_fiber(fiber)
        + calculate_carbohydrates(carbohydrates)
    )
    norm_score = (1 - normalize(raw_score, -15, 40)) * 100 # Normalize to range of 0 to 100.
    return norm_score

def normalize(raw_score, min_score, max_score):
    """
    Normalize raw score to the range from 0 to 1.
    """
    norm_score = (raw_score - min_score) / (max_score - min_score)
    return norm_score

# print(calculateScore(1590, 22.4, 0.6, 100, 0.22, 8.5, 8.6, 0))
